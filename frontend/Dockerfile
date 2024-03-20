FROM node:20-alpine3.16 as build-stage

COPY . ./hemiron-frontend
WORKDIR /hemiron-frontend

RUN npm i
RUN npm run build --prod

FROM nginx:1.23.4-alpine

COPY --from=build-stage /hemiron-frontend/dist/ipsenh-frontend/ /usr/share/nginx/html

COPY --from=build-stage /hemiron-frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
