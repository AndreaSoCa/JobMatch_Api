npm install cors
install nodemon
npm install pg-pool
npm install multer

# Página Web Job-Match

Página para ofertar diferentes labores que personas de diferentes partes pueden ver y contratar.


## Deployment

To deploy this project run the following command inside the directory to run the api

```bash
  docker build -t job_match_api .
```
To create the data base run the following command:
```bash
  docker run --name job_match_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=job_match_db -p 5432:5432 -d postgres

  docker run --name job_match_db -d -p 5432:5432 -e POSTGRES_PASSWORD=admin postgres:postgres
```
Now copi the data base information inside the container:
```bash
  docker cp data_base.sql job_match_db:/data_base.sql
```

Execute the container:
```bash
  docker exec -it job_match_db /bin/bash
  ó
  docker exec -it job_match_db bash
```
And use the data base information:
```bash
  psql -U postgres job_match_db < data_base.sql
```
## Tech Stack

**Client:** React, Css, Bootstrap, Html

**Server:** Node, Express

