FROM node:12.16.3-alpine AS build
WORKDIR /app
ARG REACT_APP_CHAT_API
ARG REACT_APP_CHAT_SOCKET_SERVER

COPY . .
RUN npm install

RUN REACT_APP_CHAT_API=${REACT_APP_CHAT_API} REACT_APP_CHAT_SOCKET_SERVER=${REACT_APP_CHAT_SOCKET_SERVER} npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]