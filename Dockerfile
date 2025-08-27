# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk update && apk add --no-cache \
    git \
    bash

# Install pnpm
RUN npm install -g pnpm

# update
ARG GIT_TOKEN
RUN cd /app && git clone -b main https://$GIT_TOKEN@github.com/Quantum-Pesona-Dunia/quantum-front.git .
RUN git reset --hard origin/main
RUN pnpm install --frozen-lockfile

# add env
COPY .env .

# Build the project
RUN pnpm build

# Expose port
EXPOSE 3001

# Start the Next.js app
CMD ["pnpm", "start"]
