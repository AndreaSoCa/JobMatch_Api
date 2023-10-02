import express from 'express';
import {addUser, getUsers} from "../service/userService.js";

const router = express.Router();
const upload = multer({storage: storage});

// Multer config
const storage = multer.diskStorage({
  destination: './uploads/user/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname+'_'+req.body.email+'_'+req.body.phone_number+'.jpg');
  },
})

/**
 * Añade un nuevo trabajador
 */
router.post('/add', (req, res, next) => {
  addUser(req,res);
})

/**
 * Añade un nuevo usuario
 */
router.get('/all', upload.single('profile_image'), (req, res) => {
  getUsers(req,res);
})

export default router;