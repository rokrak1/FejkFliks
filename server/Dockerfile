# Use an official Node.js runtime as a parent image, compatible with TypeScript
FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN mkdir -p /usr/src/app/tmp && chmod 755 /usr/src/app/tmp

# Make sure your app user has proper permissions
USER node

# Install dependencies
RUN apt-get update && apt-get install -y wget gnupg ca-certificates \
    fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 \
    libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils \
    libpango-1.0-0 libcairo2 libgbm1 libxshmfence1 libglib2.0-0

RUN npm install && npm install -g typescript

# Copy the rest of your application's source code
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Expose port 8000 for your application
EXPOSE 8000

# Define the command to run your app (assuming the output directory is 'dist')
CMD ["node", "dist/app.js"]
