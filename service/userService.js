import connect, { query } from '../routes/pool.js';

/**
 * Añade a un usuario a la base
 * @param {*} req 
 * @param {*} res 
 */
export const addUser = (req,res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on user', err);
    }

    const sql = `INSERT INTO user_table(email, phone_number, password, user_name, user_last_name, 
      user_address, is_active) VALUES ('${req.body.email}', 
      '${req.body.phone_number}', '${req.body.password}', '${req.body.user_name}', '${req.body.user_last_name}', 
      '${req.body.address}', 'true');`;
    
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running INSERT query on user', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Añade a un usuario a la base
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