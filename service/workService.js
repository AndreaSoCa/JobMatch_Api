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
 * Get work by id
 * @param {*} res 
 */
export const getWorkById = (req, res) => {
  const workId = req.params.id;
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on work', err);
    }

    client.query('SELECT * FROM work WHERE work_id = $1;', [workId], (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT query on work', err);
      }
      if (result.rows.length > 0) {
        const workData = result.rows[0];
        res.send(JSON.stringify(workData));
      } else {
        res.send('{}');
      }
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

    const sql = `INSERT INTO work(work_name, work_description, worker_amount) VALUES 
      ('${req.body.work_name}', '${req.body.work_description}', 
      '${req.body.worker_amount}')
      RETURNING work_id, work_name, work_description, worker_amount;`;
    
    client.query(sql, (err, result) => {
      
      done(err);
      
      if (err) {
        return console.error('error running INSERT query in work', err);
      }
      res.send(JSON.stringify(result.rows[0]));
    });
  });
}

/**
 * Actualiza un trabajo
 * @param {*} req 
 * @param {*} res 
 */
export const updateWork = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on work update', err);
    }

    const sql = `UPDATE work SET work_name='${req.body.work_name}', 
      work_description='${req.body.work_description}', worker_amount='${req.body.worker_amount}' 
      WHERE work_id='${req.body.work_id}';` 

    client.query(sql, (err, result) => {
      
      done(err);
      
      if (err) {
        return console.error('error running UPDATE query on work', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}