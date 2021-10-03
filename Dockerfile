FROM node:7.7.2-alpine

RUN mkdir -p /app
WORKDIR /app             # Sets the working directory in the container
COPY package.json /app  
RUN npm install          # Install dependencies
COPY . /app       
EXPOSE 4200
CMD ["npm", "run", "start"]