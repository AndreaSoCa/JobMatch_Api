import express from 'express';
import {addUser, getUsers} from "../service/userService.js";
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads/user/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname+'_'+req.body.email+'_'+req.body.phone_number+'.jpg');
  },
})

const router = express.Router();
const upload = multer({storage: storage});

/**
 * Añade un nuevo usuario
 */
router.post('/add', (req, res, next) => {
  addUser(req,res);
})

/**
 * Añade un nuevo usuario
 */
router.get('/all', (req, res) => {
  getUsers(req,res);
})

export default router;