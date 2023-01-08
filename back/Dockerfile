FROM node:18 AS back


WORKDIR /usr/src/influenceur_business/back

COPY package.json .
COPY package-lock.json .

RUN rm -rf node_modules
RUN rm -f package-lock.json
RUN npm cache clean --force
RUN npm install
RUN npm install --dotenv-extended

COPY . .
EXPOSE 3000
CMD ["sh", "-c", "nodemon src/app.js"]