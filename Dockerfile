# STAGE 1
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . /app
RUN yarn build
# STAGE 2
FROM nginx:stable-alpine
COPY --from=build /app/build ./usr/share/nginx/html
COPY --from=build /app/nginx.config ./etc/nginx/conf.d/default.conf
# Remove default nginx static assets
RUN rm -rf ./*
EXPOSE 90
CMD ["nginx", "-g", "daemon off;"]