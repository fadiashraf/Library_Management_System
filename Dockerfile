# Use a community-supported ARM64 Node.js image
FROM ghcr.io/linuxserver/node:latest

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json  ./

USER node

RUN npm install 

COPY --chown=node:node . .

ENTRYPOINT ["/sbin/tini", "--"]

EXPOSE 3000
CMD ["npm", "start"]
