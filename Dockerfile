FROM node:24-alpine AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY tsconfig.json ./
COPY src/server.ts ./src/server.ts

# Compile TypeScript
RUN yarn build

# Production image
FROM node:24-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=build /usr/src/app/dist ./dist

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile --production && yarn cache clean

# Copy compiled JS

EXPOSE 3000
CMD ["node", "dist/server.js"]
