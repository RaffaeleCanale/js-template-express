FROM node
WORKDIR /etc/wx/

COPY src/ src/
COPY package*.json ./

RUN npm install && \
    npm run build

COPY config.json ./

CMD ["npm", "start"]
