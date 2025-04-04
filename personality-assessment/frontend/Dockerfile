FROM node:20

WORKDIR /app

# Copy package files first (caching optimization)
COPY package*.json ./

# Install both prod AND dev dependencies (Vite is needed in dev)
RUN npm install

# Copy the rest of the app
COPY . .

# Use npm to run the dev script (not direct "vite" command)
CMD ["npm", "run", "dev"]