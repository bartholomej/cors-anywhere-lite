FROM node:24-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY tsconfig.json ./
COPY src/server.ts ./src/server.ts

# Compile TypeScript
RUN npx tsc

# Production image
FROM node:24-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production

# Copy compiled JS
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
