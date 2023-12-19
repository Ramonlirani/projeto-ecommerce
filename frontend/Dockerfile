###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /projeto-catalogo/frontend

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /projeto-catalogo/frontend

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /projeto-catalogo/frontend/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV prod

RUN npm ci --omit=dev && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /projeto-catalogo/frontend/package.json ./package.json
COPY --chown=node:node --from=build /projeto-catalogo/frontend/node_modules ./node_modules
COPY --chown=node:node --from=build /projeto-catalogo/frontend/public ./public
COPY --chown=node:node --from=build /projeto-catalogo/frontend/.next ./.next
COPY --chown=node:node --from=build /projeto-catalogo/frontend/.env ./.env

CMD [ "npm", "run", "start"]
