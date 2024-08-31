FROM node:20.15.1-alpine3.20
WORKDIR /app
RUN npm i -g pnpm
RUN chown -R node:node /app
USER node
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["npm", "start"]