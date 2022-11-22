# STAGE 2
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm ci
COPY . /app
RUN npm run build
# STAGE 2
FROM node:16-alpine
WORKDIR /app
RUN npm install -g webserver.local
COPY --from=build /app/build ./build
EXPOSE 3000
CMD webserver.local -d ./build