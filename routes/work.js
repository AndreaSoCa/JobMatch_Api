import express from 'express';
import { getAllWorks, addWork, updateWork, deleteWork, getWorkNameById } from '../service/workService.js';

const router = express.Router();

/**
 * Listar todos los trabajos
 */
router.get('/all', (req, res) => {
  getAllWorks(res);
})

/**
 * Añade un trabajo
 */
router.post('/add', (req, res) => {
  addWork(req, res);
})

export default router;