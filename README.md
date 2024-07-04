# Business service service for JWO Shopping System

Business backend service for the Just-Walk-Out Shopping System.

## Setup

1. Clone this repository
2. Run `npm install`
3. Install Docker
4. Run `docker compose up` to run the service in development mode
5. Run `npm run migrate:reset` to setup tables and data in DB

Service auto-restarts on code changes. Use `Remote debug` config in debugger to debug. Run `npm run migrate:reset` to reset DB. Look in `package.json` for convenient npm commands.

## Tech stack

- NestJS
- SocketIO
- Prisma
