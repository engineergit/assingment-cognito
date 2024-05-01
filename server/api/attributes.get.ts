import { getData } from './data';

export default defineEventHandler(async (event) => {
  const {
    node: { res, req }
  } = event;

  res.statusCode = 200;
  return getData();
});
