# Use a lean Node.js image as the base
FROM node:alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for efficient installation
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Create a minimal runtime image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the built Next.js application from the builder stage
COPY --from=builder /app/.next ./.next

# Install production dependencies
COPY package.json ./
RUN yarn install

# Expose the port
EXPOSE 3000

# Start the Next.js server
CMD ["yarn", "start"]
