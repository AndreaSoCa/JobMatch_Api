// Pruebas de caja blanca

const bcrypt = require('bcrypt');

test('Prueba de hashing y verificación de contraseñas', async () => {
  const password = 'contrasenaSegura';
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  expect(hashedPassword).toBeDefined();

  const isMatch = await bcrypt.compare(password, hashedPassword);
  expect(isMatch).toBe(true);
});