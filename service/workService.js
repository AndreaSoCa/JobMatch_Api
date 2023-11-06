import connect from "../routes/pool.js";

/**
 * Lista todos los trabajos
 * @param {*} res 
 */
export const getAllWorks = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on work', err);
    }

    client.query('SELECT * FROM work;', (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT query on work', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Añade a un trabajo a la base
 * @param {*} req
 * @param {*} res
 */
export const addWork = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on work', err);
    }

    const sql = `INSERT INTO work(work_id, work_name, description, worker_amount) VALUES 
      ('${req.body.work_id}', '${req.body.work_name}', '${req.body.description}', 
      '${req.body.worker_amount}');`;
    
    client.query(sql, (err, result) => {
      
      done(err);
      
      if (err) {
        return console.error('error running INSERT query in work', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}