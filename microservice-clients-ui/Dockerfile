FROM node:18.13-alpine as build
WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4200

CMD [ "npm", "start" ]