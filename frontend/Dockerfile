FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV VITE_BACKEND_PROXY=http://f1.prediction.docker/service

COPY . .

RUN npm run build

FROM nginx:stable-alpine

RUN apk add curl

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]