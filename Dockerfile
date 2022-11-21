FROM node:16.14.2
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]