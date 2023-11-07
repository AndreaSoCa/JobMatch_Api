import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import connect, { query } from '../routes/pool.js';
import { envs } from '../config/envs.js'

/**
 * Añade a un usuario a la base
 * @param {*} req 
 * @param {*} res 
 */
export const addUser = (req,res) => {
  connect(async function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on user', err);
    }

    const hashPassword = await hash(req.body.password, 10);

    const sql = `INSERT INTO user_table(email, phone_number, password, user_name, user_last_name, 
      user_address, is_active) VALUES ('${req.body.email}', 
      '${req.body.phone_number}', '${hashPassword}', '${req.body.user_name}', '${req.body.user_last_name}', 
      '${req.body.address}', 'true');`;
    
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running INSERT query on user', err);
      }
      res.json(JSON.stringify(result.rows));
    });
  });
}

/**
 * Obtiene los usuarios creados en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
export const getUsers = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on user', err);
    }

    const sql = `SELECT * FROM user_table;`;

    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running SELECT query on user', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * login user
 * @param {*} req 
 * @param {*} res 
 */
export const loginUsers = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on user', err);
    }

    const sql = `SELECT * FROM user_table WHERE email='${req.body.email}';`;

    client.query(sql, async (err, result) => {
      done(err);
      if (err || result.rows.length === 0) {
        res.status(400).json({message: 'invalid user email or password.'});
        return console.error('error running SELECT query on user', err);
      }
      const user = result.rows[0]
      if (await compare(req.body.password, user.password)) {
        res.status(200).json({
          user: {
            id: user.user_id,
            email: user.email,
            phone_number: user.phone_number,
            name: user.user_name,
            last_name: user.user_last_name,
            address: user.address
          },
          token: jwt.sign({ id: user.user_id }, envs.JWT_SEED)
        });
        return;
      }
      res.status(400).json({message: 'invalid user email or password.'});
    });
  });
}