# Use Node.js LTS as base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose API port
EXPOSE 5050

# Start the server
CMD ["node", "server.js"]
