FROM node:20-alpine3.19 as base

FROM base as builder

WORKDIR /home/build

COPY  package*.json .
COPY  vite.config.js .

RUN npm install
COPY  . .

RUN npm run build

# Phase 2

FROM nginx:alpine AS runner
# in a frontend project we don't need nodejs or npm install to run the project as build gives static files in dist folder
COPY --from=builder /home/build/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
