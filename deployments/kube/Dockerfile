# Use Node.js to build the application.
FROM node:16 AS builder

# Create and change to the app directory.
WORKDIR /app

# Copy local code to the container image.
COPY ../../ ./

# Run npm install and then build.
RUN npm install
RUN npm run build

# Use the official Go image to create a binary.
FROM golang:1.23-bookworm

# Create app user and group
# RUN addgroup app && adduser -S -H -D -G app app
RUN useradd -M -s /sbin/nologin app
RUN usermod -aG app app

# Create and change to the app directory.
WORKDIR /app

# Copy the main.go file and the dist folder, then
# build the binary.
COPY main.go .
COPY --from=builder /app/dist /app/dist
RUN go build -v -o dddstructure-frontend main.go

# Give app user permissions to run dddstructure-frontend app
# and access to the dist folder
RUN chown -R app /app/dddstructure-frontend
RUN chown -R app /app/dist

# Expose port 5173 on container (the port it listens on).
EXPOSE 5173

# Switch to app user.
USER app

# Run the app on container startup.
CMD ["./dddstructure-frontend"]


