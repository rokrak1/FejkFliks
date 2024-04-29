# Use an official Node.js runtime as a parent image, compatible with TypeScript
FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including TypeScript globally
RUN npm install && npm install -g typescript

# Copy the rest of your application's source code
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Expose port 8000 for your application
EXPOSE 8000

# Define the command to run your app (assuming the output directory is 'dist')
CMD ["node", "dist/app.js"]
