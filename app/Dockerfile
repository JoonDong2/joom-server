FROM keymetrics/pm2:12-alpine

# Bundle APP files
COPY app /app
WORKDIR /app

# Install app dependencies
RUN npm i yarn
RUN yarn
RUN yarn build

EXPOSE 3000

USER node

CMD [ "pm2-runtime", "start", "pm2.json" ]