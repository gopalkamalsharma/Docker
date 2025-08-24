# 1. Set base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /usr/src/app

# 3. Copy package.json first (for caching npm install)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of app code
COPY . .

# 6. Set environment variable
ENV PORT=3000

# 7. Expose port
EXPOSE 3000

# 8. Define default command
CMD ["npm", "start"]

