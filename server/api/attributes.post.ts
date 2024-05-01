import { addData } from './data';

export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  const {
    node: { res, req }
  } = event;

  addData(requestBody);
  res.statusCode = 201;
  return requestBody;
});
