# --- Step 1: Build stage ---
FROM node:20-alpine as build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project and build the app
COPY . .
RUN npm run build   

# --- Step 2: Run stage ---
FROM node:20-alpine
WORKDIR /app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy the built app from the build stage
COPY --from=build /app/dist ./dist

# Expose the port for the app
EXPOSE 3000

# Set the environment variable for MongoDB (inside the container)
ENV MONGODB_URI=mongodb://mongo:27017/nest-task-management

# Run the app
CMD ["node", "dist/main"]
