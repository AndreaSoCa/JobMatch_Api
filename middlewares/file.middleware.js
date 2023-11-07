import fs from 'fs'
import multer from 'multer'

export class FileMiddleware {
  constructor (
    fileName,
    saveFolder
  ) {
    this.fileName = fileName
    this.saveFolder = saveFolder
  }

  manageFile = (req, res, next) => {
    try {
      if (!fs.existsSync(this.saveFolder)) {
        fs.mkdirSync(this.saveFolder)
      }

      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, this.saveFolder);
        }.bind(this),
        filename: function (req, file, cb) {
          cb(null, `${this.fileName}.jpg`);
        }.bind(this),
      });

      const upload = multer({ storage }).array('files')

      upload(req, res, (err) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ error: 'File Upload Error' })
        }
        next()
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
