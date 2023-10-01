import express from 'express';
import {addUser} from "../service/userService.js";
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
router.post('/add', upload.single('public_services'), (req, res, next) => {
  addUser(req,res);
})

export default router;