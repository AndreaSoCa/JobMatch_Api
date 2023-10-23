import { loginWorker } from '../../service/workerService'; 
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const mockClient = jest.fn();
const pool = new Pool();

const req = {
  body: {
    email: 'test@tuki.com',
    password: 'TukiPassword123',
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('We trying the loginWorker function', () => {
  it('should successfully log in a worker', async () => {
    const mockWorker = {
      email: 'test@example.com',
      password: '$2y$10$HiXfCbGdkiUiCB6BiwFZceogonqKMAO4.rMKYvBrZSb0djd/jjT.G',
    };

    mockClient.mockImplementation((sql, callback) => {
      callback(null, { rows: [mockWorker] });
    });

    compare.mockResolvedValue(true);


    jwt.sign.mockReturnValue('mockedToken');

    try {
      await loginWorker(req, res);

      if (res.status.mock.calls[0][0] !== 200) {
        console.error('Estado de respuesta inesperado:', res.status.mock.calls[0][0]);
      }

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        worker: {
          email: 'test@example.com',
        },
        token: '$2y$10$HiXfCbGdkiUiCB6BiwFZceogonqKMAO4.rMKYvBrZSb0djd/jjT.G',
      });
    } catch (error) {
      console.error('Prueba fallida:', error);
    } finally {
      await pool.end();
    }
  });
});
