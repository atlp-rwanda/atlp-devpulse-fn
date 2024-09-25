# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Add the backend application in environment variables
ENV BACKEND_URL=https://atlp-devpulse-bn.onrender.com

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including dev dependencies) with legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]