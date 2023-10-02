###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /app/backend

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /app/backend

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/backend/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run prisma:migrate:deploy \
    && npm run prisma:generate \
    && npm run prisma:seed:prod \
    && npm run build

ENV NODE_ENV prod

RUN npm ci --omit=dev && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

COPY --chown=node:node --from=build /app/backend/node_modules ./node_modules
COPY --chown=node:node --from=build /app/backend/dist ./dist
COPY --chown=node:node --from=build /app/backend/.env.prod ./.env.prod
COPY --chown=node:node --from=build /app/backend/package.json ./package.json

CMD [ "npm", "run", "start:prod"]
