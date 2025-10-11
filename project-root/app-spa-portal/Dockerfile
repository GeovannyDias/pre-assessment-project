# Etapa de build
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build --configuration=production

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist/app-spa-portal/browser /usr/share/nginx/html
EXPOSE 80
