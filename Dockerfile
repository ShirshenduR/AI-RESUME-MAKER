# Use Ubuntu as base image
FROM ubuntu:22.04

# Set environment to non-interactive
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js 18.x and LaTeX (texlive-full)
RUN apt-get update && \
    apt-get install -y curl gnupg software-properties-common && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs texlive-full && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy backend source files
COPY . .

# Install backend dependencies
RUN npm install

# Expose the port your backend listens on
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
