# Base image
FROM node:16
# FROM busybox


# Create and set the working directory
WORKDIR /backend

# # Install dependencies
COPY package*.json ./
RUN npm install

# # Copy the source code
COPY . .

# # Build the Prisma schema and generate the Prisma client
RUN npx prisma generate

# # Run migrations
# RUN npx prisma migrate dev

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npx", "nodemon", "index.js"]
