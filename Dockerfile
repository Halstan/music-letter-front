FROM node:16-alpine as build-stage
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]