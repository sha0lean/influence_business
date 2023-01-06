# ——————————  UI APPLICATION SIDE ——————————————————————————————
# create a build folder for the UI
FROM node:14 AS ui-build

# inside the path to the client folder
WORKDIR /usr/app/client/
# copy & install the node config before anything 
COPY front/package*.json ./
RUN npm install
# copy the react folders
COPY front/src/ ./src
COPY front/public/ ./public
RUN npm run build


# —————————— SERVER SIDE ———————————————————————————————————————
FROM node:14 AS server-build

WORKDIR /usr/app/

COPY --from=ui-build /usr/app/client/build/ ./client/build
WORKDIR /usr/app/server/

COPY back/package*.json ./
RUN npm install

COPY src/app.js ./

ENV NODE_ENV=production

EXPOSE 5000

CMD [ "node", "app.js" ]