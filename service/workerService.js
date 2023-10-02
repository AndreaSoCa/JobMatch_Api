import connect from '../routes/pool.js';

/**
 * Añade a un usuario a la base
 * @param {*} req 
 * @param {*} res 
 */
export const addWorker = (req,res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }

    const sql = `INSERT INTO worker(
      email,
      password,
      phone_number,
      worker_name,
      worker_last_name,
      profile_image,
      identification_image,
      worker_address,
      stars,
      available,
      is_active
    ) VALUES (
      '${req.body.email}',
      '${req.body.password}',
      '${req.body.phone_number}',
      '${req.body.worker_name}',
      '${req.body.worker_last_name}',
      '${req.body.profile_image}',
      '${req.body.identification_image}',
      '${req.body.worker_address}',
      '${req.body.stars}',
      '${req.body.available}',
      '${req.body.is_active}'
    );`;
    
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        res.status(400).json({message: 'Server error'});
        return console.error('error running INSERT query on worker', err);
      }
      res.status(200).json(result.rows);
    });
  });
}

/**
 * Añade a un usuario a la base
 * @param {*} req 
 * @param {*} res 
 */
export const getWorkers = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }

    const sql = 'SELECT * FROM worker;';

    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running SELECT query on worker', err);
      }
      res.status(200).json((result.rows));
    });
  });
}

/**
 * Permite guardar archivos en el back
 * @param {*} req 
 * @param {*} res 
 */
export const uploadFile = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error connecting to the pool on upload', err);
    }

    const file = req.file;
    if(!file) {
      res.status(400).send("File not found!")
    }
    console.log('file ', req.file); //todo remove
    console.log('address ', req.body); //todo remove
    res.send(req.file);
  })
}
