import connect from '../routes/pool.js'

/**
 * Obtiene a todos los servicios de la base
 * @param {*} res 
 */
export const getAllServices = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    client.query('SELECT * FROM service;', (err, result) => {
      
      done(err);

      if (err) {
        return console.error('error running SELECT query on service', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Obtiene a todos los servicios por job offered id
 * @param {*} req 
 * @param {*} res 
 */
export const getAllServicesByJobOfferedId = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    const sql = `SELECT * FROM service WHERE job_offered_id='${req.params.job_offered_id}';`
    
    client.query(sql, (err, result) => {
      
      done(err);

      if (err) {
        return console.error('error running SELECT getAllByJOb WHERE query on service', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Obtiene a todos los servicios terminados de acuerdo con su job offered id
 * @param {*} req 
 * @param {*} res 
 */
export const getAllServicesDoneByJobOfferedId = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    const sql = `SELECT * FROM service WHERE job_offered_id='${req.params.job_offered_id}' AND done='true';`
    
    client.query(sql, (err, result) => {
      
      done(err);

      if (err) {
        return console.error('error running SELECT getAllServiceDoneByJob WHERE query on service', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Añade un servicio a la base
 * @param {*} req 
 * @param {*} res 
 */
export const addService = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    console.log(req.body.user_phone,req.body.paid,req.body.done);
    const sql = `INSERT INTO service(job_offered_id, user_email, user_phone, cost, 
      service_stars, date_begin, date_end, paid, done) VALUES ('${req.body.job_offered_id}', '${req.body.user_email}', '${req.body.user_phone}', '${req.body.cost}', 
      '${req.body.service_stars}', '${req.body.date_begin}','${req.body.date_end}','${req.body.paid}',
      '${req.body.done}');`
    
    client.query(sql, (err, result) => {
      
      done(err);

      if (err) {
        return console.error('error running SELECT addService WHERE query on service', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Actualiza el estado de un servicio
 * @param {*} req 
 * @param {*} res 
 */
export const updateServiceDone = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    const sql = `UPDATE service set done='${req.params.done}' WHERE service_id='${req.params.service_id}';`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running UPDATE status query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}