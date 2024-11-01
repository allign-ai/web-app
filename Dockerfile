FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install ALL dependencies, including devDependencies
RUN npm install

# Bundle app source
COPY . .

# Set environment variables
ENV NODE_ENV=development

# Expose the port the app runs on
EXPOSE 5173

# Mount these directories as volumes in development
VOLUME ["/usr/src/app/node_modules", "/usr/src/app"]

# Use npm run dev command
CMD npm run dev > /var/log/app.log 2>&1