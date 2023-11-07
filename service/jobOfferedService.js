import connect from "../routes/pool.js";

/**
 * Añade a un trabajo ofrecido por un trabajador a la base de datos
 * @param {*} req 
 * @param {*} res 
 */
export const addJobOffered = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on job_offered', err);
    }

    const sql = `INSERT INTO job_offered(worker_email, worker_phone_number, 
      work_id, signed, is_active, cost_per_service) VALUES ('${req.body.worker_email}',
      '${req.body.worker_phone_number}', '${req.body.work_id}', 'false', 'true', '${req.body.cost_per_service}');`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running INSERT query in job_offered', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Lista todos los trabajos ofrecidos por un trabajador
 * @param {*} req
 * @param {*} res
 */
export const getAllJobOfferedByWorkerEmail = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool job offered', err);
    }

    const sql = `SELECT * FROM job_offered WHERE worker_email='${req.params.worker_email}'
      AND is_active=${true}`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT BY ID AQUII query in job_offered', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Elimina un trabajo ofrecido de la base, cambiando su isActive a false
 * @param {*} req 
 * @param {*} res 
 */
export const deleteJobOffered = (req, res) =>{
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on job_offered', err);
    }

    const sql = `UPDATE job_offered SET is_active='false'
      WHERE job_offered_id='${req.params.job_offered_id}';` 

    client.query(sql, (err, result) => {
      
      done(err);
      
      if (err) {
        return console.error('error running DELETE query in job offered', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}