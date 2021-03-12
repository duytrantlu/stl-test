FROM rzdevteam/pm2:12.18.3-alpine
LABEL author="manh.nguyen@vmodev.com"

RUN mkdir -p /home/stl4-01-order-service
WORKDIR /home/stl4-01-order-service

# cache package layer
COPY package.json yarn.lock ecosystem-staging.json .env.staging ./
RUN yarn install --production \
  && yarn cache clean \
  && node-prune
# layer change
COPY ./dist ./dist

EXPOSE 8082

ENTRYPOINT [ "pm2-runtime","start","ecosystem-staging.json" ]
