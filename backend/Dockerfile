# Base image
FROM ubuntu:22.04

# Set environment to non-interactive
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js and LaTeX
RUN apt-get update && \
    apt-get install -y curl gnupg software-properties-common && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs texlive-full && \
    apt-get clean

# Set working directory to /app
WORKDIR /app

# Copy backend code only
COPY . .

# Install dependencies
RUN npm install

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]
