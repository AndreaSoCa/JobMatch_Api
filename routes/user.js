import express from 'express';
import {addUser, getUsers, loginUsers, uploadImage} from "../service/userService.js";
import multer from 'multer';
import { FileMiddleware } from '../middlewares/file.middleware.js';

// const storage = multer.diskStorage({
//   destination: './uploads/user/',
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname+'_'+req.body.email+'_'+req.body.phone_number+'.jpg');
//   },
// })

const router = express.Router();
// const upload = multer({storage: storage});
const multerUpload = new FileMiddleware('userImage', './uploads/user')

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

/**
 * Login  de usuario
 */
router.post('/login', (req, res) => {
  loginUsers(req,res);
})

/**
 * Upload image
 */
router.post('/upload', multerUpload.manageFile, (req, res) => {
  uploadImage(req,res);
})

export default router;