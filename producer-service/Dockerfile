FROM node:18
WORKDIR /app/producer-service
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node","src/server.js"]