import express from 'express';
import { getAllWorks, addWork, getWorkById, updateWork } from '../service/workService.js';
// import { getAllWorks, addWork, updateWork, deleteWork, getWorkNameById } from '../service/workService.js';

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

/**
 * Must always be at the end of the file
 * Get work by id
 * 
 */
router.get('/:id', (req, res) => {
  getWorkById(req, res);
})

/**
 * Actualiza un trabajo
 */
router.put('/update', (req, res) => {
  updateWork(req, res);
})

export default router;