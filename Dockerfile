FROM node:22.11.0
WORKDIR /app/src

COPY package.json package-lock.json ./
COPY tsconfig.json
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
