import connect from '../routes/pool.js';

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
    const file = req.file;
    if(!file) {
      res.status(400).send("something went wrong!")
    }

    const sql = `INSERT INTO user_table(email, phone_number, user_name, user_last_name, 
      user_address, public_services, payment_method, is_active) VALUES ('${req.body.email}', 
      '${req.body.phone_number}', '${req.body.user_name}', '${req.body.user_last_name}', 
      '${req.body.address}', 'user/${'public_services_'+req.body.email+'_'+req.body.phone_number+'.jpg'}', '${req.body.payment_method}', 
      'true');`;
    
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running INSERT query on user', err);
      }
      //res.send(JSON.stringify(result));
    });
  });
}