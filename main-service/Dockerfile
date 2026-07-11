FROM node:22-alpine as builder

WORKDIR /usr/src/app
RUN npm install -g npm@11.18.0
RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build