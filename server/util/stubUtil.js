import jsonPath from 'jsonpath';

function getStubsPath(event) {
  const { node, path } = event;
  if (path?.includes('/api/dev/')) {
    const url = new URL(node.req.headers?.host ? node.req.headers.host + node.req.url : node.req.url);
    return url.pathname.replace('3000/api/dev/api/', '');
  } else return '';
}

function matchesPath(fixture, pathname) {
  // if the pathPattern is not specified in the fixture, then assume matches.
  if (!fixture.pathPattern) return true;

  return RegExp(fixture.pathPattern).test(pathname);
}

function matchesQueryParameters(fixture, queryParams) {
  // if the query parameter patten object is not defined, we do an automatic matching here
  if (!fixture.queryParameterPattern) return true;

  const queryParameterNames = Object.keys(queryParams);
  const matchingParams = queryParameterNames.filter((queryParameter) => {
    const pattern = fixture.queryParameterPattern[queryParameter];
    // if not pattern is specified for given query parameter, we assume it matches
    if (!pattern) return true;

    return RegExp(pattern).test(queryParams[queryParameter]);
  });

  /**
   * if the length of the query parameters is equal to the length of the matching parameters
   * we assume a complete match.
   */
  return queryParameterNames.length === matchingParams.length;
}

function equalToJson(pattern, body) {
  // if the pattern is undefined, assume it matches
  if (!pattern) return true;
  return JSON.stringify(pattern) === JSON.stringify(body);
}

/**
 *
 * @param pattern
 * @param body Array
 */
function matchesJsonPathContains(pattern, body) {
  return body.includes(pattern);
}

/**
 *
 * @param pattern
 * @param body Array
 */
function matchesJsonPathDoesNotContains(pattern, body) {
  // if the pattern is undefined, assume it does not contain
  if (!pattern) return true;
  return !body.includes(pattern);
}

function matchesJsonPath(pattern, body) {
  if (typeof pattern === 'object') {
    const expression = pattern['expression'];
    if (expression) {
      const elements = jsonPath.query(body, expression);
      // if no elements are present, then assume no match
      if (elements.length === 0) return false;

      if (pattern['equalToJson'] && equalToJson(pattern['equalToJson'], elements[0])) return true;
      if (pattern['contains'] && matchesJsonPathContains(pattern['contains'], elements)) return true;
      if (pattern['doesNotContain'] && matchesJsonPathDoesNotContains(pattern['doesNotContain'], elements)) return true;

      return false;
    } else {
      console.error('missing jsonpath expression');
      return false;
    }
  } else {
    const elements = jsonPath.query(body, pattern);
    return elements.length > 0;
  }
}

function matchesBody(fixture, body) {
  // if the body pattern is not specified in the fixture, we assume it matches
  if (!fixture.bodyPatterns || fixture.bodyPatterns.length === 0) return true;

  return (fixture.bodyPatterns || []).every((pattern) => {
    // TODO provide additional support for these operators
    // TODO equalToXml
    // TODO matchesXPath

    let patternKeys = Object.keys(pattern);
    // if pattern has no keys, we assume it matches
    if (patternKeys.length === 0) return true;

    // every defined pattern has to match otherwise false;
    return patternKeys.every((patternKey) => {
      let matches;
      switch (patternKey) {
        case 'equalToJson':
          matches = equalToJson(pattern[patternKey], body);
          break;
        case 'matchesJsonPath':
          matches = matchesJsonPath(pattern[patternKey], body);
          break;
        default:
          matches = false;
          break;
      }
      return matches;
    });
  });
}

export async function findFixture(fixtures, event) {
  const body = event.req.method === 'GET' || event.req.method === 'DELETE' ? null : await readBody(event);
  const fixture = (fixtures || []).find((fixture) => {
    return (
      matchesPath(fixture, getStubsPath(event)) &&
      matchesQueryParameters(fixture, getQuery(event)) &&
      matchesBody(fixture, body)
    );
  });

  return fixture;
}

export function isStubsApiRequest(event) {
  const { path } = event;
  return path?.includes('/api/dev/');
}
