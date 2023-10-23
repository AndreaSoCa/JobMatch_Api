// Prubas de integración 

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

describe('Pruebas de Integración para Payload de JWT', () => {
  it('Debería generar un token JWT válido', () => {
    const JWT_SEED = process.env.JWT_SEED;

    const payload = { id: 123, username: 'usuario_de_prueba' };

    const token = jwt.sign(payload, JWT_SEED);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});