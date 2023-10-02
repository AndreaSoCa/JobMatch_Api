import { describe, test, expect, jest } from '@jest/globals';
import { query } from '../../routes/pool';

describe('Testing pg query get users', () => {
  test('Should return a user or empty array', async () => {
    const res = await query('SELECT * FROM user_table;', [])
    expect(res.rows.length).toBeGreaterThanOrEqual(0)
  });
});