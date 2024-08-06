#Build stage
FROM node:20-alpine as build

WORKDIR /app

COPY package* ./

COPY package-lock* ./

RUN npm install --only=prod

COPY . .

RUN npm run build
#Deploy stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

