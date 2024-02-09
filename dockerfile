FROM node:14
WORKDIR /server
COPY package*.json server.js ./
RUN npm install
EXPOSE 7000
CMD ["node", "server.js"]
