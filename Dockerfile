FROM  node:latest

WORKDIR  /music_server
COPY . .

RUN npm install
EXPOSE 3000

CMD ["npm","start"]