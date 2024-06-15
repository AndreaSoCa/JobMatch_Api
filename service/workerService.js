import connect from '../routes/pool.js';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import { envs } from '../config/envs.js'

/**
 * Añade a un usuario a la base
 * @param {*} req 
 * @param {*} res 
 */
export const addWorker = (req,res) => {
  connect(async function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }
    const hashPassword = await hash(req.body.password, 10);
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
      '${hashPassword}',
      '${req.body.phone_number}',
      '${req.body.worker_name}',
      '${req.body.worker_last_name}',
      '',
      '',
      '${req.body.worker_address}',
      ${0},
      'true',
      'true'
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
 * login worker
 * @param {*} req 
 * @param {*} res 
 */
export const loginWorker = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }

    const sql = `SELECT * FROM worker WHERE email='${req.body.email}';`;

    client.query(sql, async (err, result) => {
      done(err);
      if (err || result.rows.length === 0) {
        res.status(400).json({message: 'invalid worker email or password.'});
        return console.error('error running SELECT query on worker', err);
      }
      const worker = result.rows[0]
      if (await compare(req.body.password, worker.password)) {
        res.status(200).json({
          user: {
            id: worker.worker_id,
            email: worker.email,
            phone_number: worker.phone_number,
            name: worker.worker_name,
            last_name: worker.worker_last_name,
            address: worker.worker_address
          },
          token: jwt.sign({ id: worker.worker_id }, envs.JWT_SEED)
        });
        return;
      }
      res.status(400).json({message: 'invalid worker email or password.'});
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

/**
 * Actualiza el registro de un trabajador en la base
 * @param {*} req
 * @param {*} res 
 */
export const updateWorker = (req, res) => {
  connect(async (err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }

    const hashPassword = req.body.password ? await hash(req.body.password, 10) : null;
    
    let sql = `UPDATE worker set worker_name='${req.body.worker_name}', worker_last_name='${req.body.worker_last_name}', 
      profile_image='${req.body.profile_image}', worker_address='${req.body.worker_address}',`;
      
    if (hashPassword) {
      sql += `password='${hashPassword}',`;
    }
    
    sql += `identification_image='${req.body.identification_image}' 
      WHERE email='${req.body.email}' AND 
      phone_number='${req.body.phone_number}'
      RETURNING worker_id, email, phone_number, worker_name, worker_last_name, profile_image, identification_image, worker_address;`;

    client.query(sql, async (err, result) => {

      done(err);

      if (err) {
        return console.error('error running INSERT query on worker', err);
      }

      try {
        const worker = result.rows[0]
          res.status(200).json({
            id: worker.worker_id,
            email: worker.email,
            phone_number: worker.phone_number,
            name: worker.worker_name,
            last_name: worker.worker_last_name,
            address: worker.worker_address
          });
          return;
      } catch (e) {
        res.status(400).json({message: 'invalid user email or password.'});
      }
    });
  });
}

export const uploadImage = async (req, res) => {
  connect(async function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }
    const newFilePath = `./uploads/worker/workerImage_${req.body.workerId}.jpg`
    await rename('./uploads/worker/workerImage.jpg', newFilePath)

    const sql = `
      UPDATE worker
      SET profile_image = '${newFilePath}'
      WHERE worker_id='${req.body.workerId}';`;

    client.query(sql, async (err, result) => {
      done(err);
      if (err) {
        res.status(400).json({message: 'invalid worker id.'});
        return console.error('error running UPDATE query on worker.', err);
      }
      res.status(200).json({ imgPath: newFilePath });
    });
  });
}
