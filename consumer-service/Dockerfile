FROM node:18
WORKDIR /app/consumer-service
COPY package*.json .
RUN npm install
COPY . .
CMD ["node","main.js"]