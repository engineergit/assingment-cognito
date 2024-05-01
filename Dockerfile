FROM node:20.10.0-alpine3.18 as builder
VOLUME /root/.npm

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set progress=true && \
    npm config set depth 0 && \
    npm pkg delete scripts.prepare && \
    npm ci --legacy-peer-deps --cache /root/.npm --prefer-offline --no-audit --no-fund --omit=dev


FROM builder as runner

USER node

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV HOST 0.0.0.0
ENV PORT 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000
COPY . .

CMD [ "node", ".output/server/index.mjs", "start"]
