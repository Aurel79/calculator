# Use official Node.js LTS slim image
FROM node:18-alpine

WORKDIR /usr/src/app

# copy package first for better caching
COPY app/package.json ./
RUN npm install --production

# copy app files
COPY app/ ./

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]