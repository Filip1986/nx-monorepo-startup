# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the root directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Apply Prisma migrations
RUN npx prisma migrate deploy

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
