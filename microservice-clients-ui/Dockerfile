FROM node:18.13-alpine as build
WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx as runtime
COPY --from=build /usr/src/app/dist/microservice-clients-ui /usr/share/nginx/html
EXPOSE 4200