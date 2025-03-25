import multer from "multer";
import {v4 as uuidv4} from "uuid"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload")
    },
    filename: function (req, file, cb) {

      const number = uuidv4()
      cb(null, number+""+file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })

  export default upload