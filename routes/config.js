import { envs } from "../config/envs.js";

const config = {
  "host": 'db', //env var: PGHOST
  "user": envs.POSTGRES_USER, //env var: PGUSER
  "database": envs.POSTGRES_DB, //env var: PGDATABASE
  "password": envs.POSTGRES_PASSWORD, //env var: PGPASSWORD
  "port": envs.DB_PORT //env var: PGPORT
};
  
export default config;