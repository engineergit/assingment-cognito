import { server } from '../config';
import axios, { type Method } from 'axios';

export default defineEventHandler(async (event) => {
  const acceptableMethods: Array<string | undefined> = ['POST', 'PUT', 'PATCH'];
  const {
    node: { res, req }
  } = event;

  if (req.method === 'GET') {
    try {
      const { data, status } = await axios.get(`${server.API_URL}${event.path}`, {});
      console.info(`BFF-${event.path}-${req.method}`);
      res.statusCode = status;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (ex: any) {
      const { response } = ex;
      console.error(`BFF-${event.path}-${req.method}`);
      // console.log(ex);
      res.statusCode = response.status;
      return response.data;
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { data, status } = await axios.delete(`${server.API_URL}${event.path}`, {});
      console.info(`BFF-${event.path}-${req.method}`);

      res.statusCode = status;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (ex: any) {
      const { response } = ex;
      console.log(ex);
      console.error(`BFF-${event.path}-${req.method}`);
      res.statusCode = response.status;
      return response.data;
    }
  }

  if (acceptableMethods.includes(req.method)) {
    try {
      console.log(`${server.API_URL}${event.path} `);
      const requestBody = await readBody(event);
      const { data, status } = await axios({
        method: req.method as Method,
        url: `${server.API_URL}${event.path} `,
        data: {
          ...requestBody
        }
      });
      console.info(`BFF-${event.path}-${req.method}`);
      res.statusCode = status;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (ex: any) {
      console.error(`BFF-${event.path}-${req.method}`);
      console.log(ex);
      const { response } = ex;
      res.statusCode = response.status;
      return response.data;
    }
  }
});
