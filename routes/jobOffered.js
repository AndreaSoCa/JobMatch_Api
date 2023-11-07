import express from 'express';
import { addJobOffered, deleteJobOffered, getAllJobOfferedByWorkerEmail } from '../service/jobOfferedService.js';

const router = express.Router();


/**
 * Añade un trabajo a la oferta
 */
router.post('/add', (req, res) => {
  addJobOffered(req, res);
})

/**
 * Lista los trabajos ofrecidos de un trabajador
 */
router.get('/worker/:worker_email', (req, res) => {
  getAllJobOfferedByWorkerEmail(req, res);
})

/**
 * Elimina un trabajo cambiando su is_active a false
 */
router.put('/delete/:job_offered_id', (req, res) => {
  deleteJobOffered(req, res);
})

export default router;
