FROM node:22.11.0
WORKDIR /workspace

COPY package.json package-lock.json ./
RUN npm install
RUN chown -R node:node ./
USER node

# Next.jsによってテレメトリデータを収集するのを無効にする
ARG NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED

CMD ["npm", "run", "dev"]
