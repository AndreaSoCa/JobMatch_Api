import express from 'express';
import { addWorker, getWorkers, loginWorker, updateWorker } from '../service/workerService.js';
import multer from 'multer';

const router = express.Router();
// Multer config
const storage = multer.diskStorage({
  destination: './uploads/user/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname+'_'+req.body.email+'_'+req.body.phone_number+'.jpg');
  },
})
  
const upload = multer({storage: storage});


/**
 * Añade un nuevo trabajador
 */
router.post('/add', (req, res, next) => {
  addWorker(req,res);
})

/**
 * Añade un nuevo usuario
 */
router.get('/all', upload.single('profile_image'), (req, res) => {
  getWorkers(req,res);
})

/**
 * login de  usuario
 */
router.post('/login', (req, res) => {
  loginWorker(req,res);
})

/**
 * Actualiza un trabajador.
 */
router.put('/update', (req, res, next) => {
  updateWorker(req, res);
})

export default router;