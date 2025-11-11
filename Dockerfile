
FROM node:24.11.0-alpine

RUN npm install -g pnpm && \
    apk add --no-cache ffmpeg

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install 

COPY . .

RUN pnpm run build:api


# Inicia la API
CMD ["pnpm", "run", "start:api"]