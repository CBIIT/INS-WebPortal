FROM node:20.11.1-alpine3.19  as build


WORKDIR /usr/src/app

COPY . .

RUN apk upgrade --update && apk --no-cache add git

RUN NODE_OPTIONS="--openssl-legacy-provider"
RUN NODE_OPTIONS="--max-old-space-size=4096" npm set progress=false
RUN NODE_OPTIONS="--max-old-space-size=4096" npm ci --legacy-peer-deps
RUN NODE_OPTIONS="--openssl-legacy-provider" npm run build --silent

# FROM nginx:1.23.3-alpine
FROM nginx:1.25.2 AS fnl_base_image

RUN apt-get update && apt-get -y upgrade

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/config/inject.template.js /usr/share/nginx/html/inject.template.js
COPY --from=build /usr/src/app/config/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=build /usr/src/app/config/entrypoint.sh /

ENV PORT 80

ENV HOST 0.0.0.0

RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

EXPOSE 80

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
