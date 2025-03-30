FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build gateway

CMD ["npm", "run", "start:dev", "gateway"] 