FROM node:20-bullseye-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --
RUN cp -a docs/. build/docs

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .
COPY --chown=node:node --from=build /home/node/app/docs .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]
