CREATE TABLE user_table(
  user_id serial PRIMARY KEY,
  email varchar(100) unique not null ,
  "password" varchar(100) unique not null,
  phone_number varchar(50) unique not null,
  user_name varchar(50),
  user_last_name varchar(50),
  user_address varchar(100),
  is_active boolean
);

CREATE TABLE worker(
  worker_id serial PRIMARY KEY, 
  email varchar(100) unique not null ,
  phone_number varchar(50) unique not null,
  worker_name varchar(50), 
  worker_last_name varchar(50), 
  profile_image varchar(150), 
  identification_image varchar(150), 
  worker_address varchar(150), 
  stars integer, 
  available boolean, 
  is_active boolean
);

CREATE TABLE work(
  work_id serial PRIMARY KEY,
  work_name varchar(150) not null,
  work_description varchar(200),
  worker_amount integer
);

CREATE TABLE job_offered(
  job_offered_id serial PRIMARY KEY,
  worker_email varchar(100) not null,
  worker_phone_number varchar(50) not null,
  signed boolean,
  cost_per_service integer,
  work_id integer not null,
  FOREIGN KEY(worker_email) REFERENCES worker(email),
  FOREIGN KEY(worker_phone_number) REFERENCES worker(phone_number),
  FOREIGN KEY(work_id) REFERENCES work(work_id)
);

create table service(
  service_id serial PRIMARY KEY,
  job_offered_id integer not null,
  user_email varchar(100) not null,
  user_phone varchar(50) not null,
  cost float,
  service_stars integer,
  date_begin date,
  date_end date,
  paid boolean,
  done boolean,
  FOREIGN KEY(job_offered_id) REFERENCES job_offered(job_offered_id),
  FOREIGN KEY(user_email) REFERENCES user_table(email),
  FOREIGN KEY(user_phone) REFERENCES user_table(phone_number)
);

INSERT INTO work(work_name, work_description) 
  VALUES ('Profesor de inglés', 'Clases particulares de inglés para fines acádemicos y personales');
INSERT INTO work(work_name, work_description) 
  VALUES ('Destapador de baños', 'Encargado de cualquier emergencia con el sanitario: destapa, limpia y soluciona problemas del inodoro');
INSERT INTO work(work_name, work_description) 
  VALUES ('Fotografo', 'Toma fotos en eventos u ocasiones especiales, realiza vídeos de un evento si desea');
INSERT INTO work(work_name, work_description) 
  VALUES ('Cocinero', 'Preparación de comidas para eventos especiales: bodas, cumpleaños, primera comunión, etc');
INSERT INTO work(work_name, work_description) 
VALUES ('Taxista', 'Servicio de taxi para cualquier parte de Cali: Sucre, Vergel, Manuela Beltrán, donde sea ');