import express from 'express';
import {addUser, getUsers} from "../service/userService.js";
import { addWorker, getWorkers } from '../service/workerService.js';
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
  console.log('POSTWORKERRR')
  addWorker(req,res);
})

/**
 * Añade un nuevo usuario
 */
router.get('/all', upload.single('profile_image'), (req, res) => {
  getWorkers(req,res);
})

export default router;