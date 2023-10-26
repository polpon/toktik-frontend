# build stage
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

EXPOSE 80

COPY default.conf /etc/nginx/conf.d

COPY --from=build-stage /app/dist /usr/share/nginx/html