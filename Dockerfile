# STAGE 1
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . /app
RUN yarn build
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]