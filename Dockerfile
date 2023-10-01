FROM node:17

# Create app directory
WORKDIR /devhappy/job_match_db

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "run", "dev" ]