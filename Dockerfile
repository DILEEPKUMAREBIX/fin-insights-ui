# Use a lightweight Node.js image
FROM node:22-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
