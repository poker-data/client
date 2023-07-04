# Etapa de construcción
FROM node:14 as build-stage

WORKDIR /app

# Copia los archivos de la aplicación
COPY package*.json ./
COPY package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Compila la aplicación
RUN npm run build

# Etapa de producción
FROM node:14 as production-stage

WORKDIR /app

# Copia los archivos compilados de la etapa de construcción
COPY --from=build-stage /app/build ./build

# Instala un servidor HTTP simple para servir la aplicación
RUN npm install -g serve

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar el servidor HTTP
CMD ["serve", "-s", "build", "-l", "3000"]