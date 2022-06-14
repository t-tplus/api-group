FROM node:12-buster

WORKDIR /usr/app

COPY package.json ./


RUN npm install

COPY . .

CMD [ "npm", "start" ]

