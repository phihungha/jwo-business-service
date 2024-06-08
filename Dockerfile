FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
COPY prisma/ prisma/
RUN --mount=type=cache,target=~/.npm npm install
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src/ src/
RUN npm run build

FROM node:22
WORKDIR /app
COPY --from=build /app/node_modules node_modules/
COPY --from=build /app/dist dist/
EXPOSE 5000
CMD ["node", "dist/main"]