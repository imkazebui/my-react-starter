# Using NodeJS v8.9.1 LTS
FROM node:8.9.1

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install yarn
RUN npm i -g yarn

# Install dependencies
RUN yarn install

# Port
EXPOSE 8080

# Run app
CMD ["yarn", "start"]