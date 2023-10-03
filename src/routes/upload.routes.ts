import { Request, Router } from "express";
import UploadController from "../controllers/upload.controller";

import multer from "multer";
import path from 'path';
import fs from 'fs';
class UploadRoutes {
  router = Router();
  controller = new UploadController();

  constructor() {
    this.intializeRoutes();
  }


  intializeRoutes() {

    // const storage = multer.diskStorage({
    //   destination: function (req: Request, file, cb) {
    //     const path_file = req.body.path_file; /*untuk mendapatkan param body semua param harus dikirm seblum file dikirim*/
    //     const uploadPath = path.resolve(path.join(__dirname, '../../../public/uploads/' + path_file));

    //     if (!fs.existsSync(uploadPath)) {
    //       fs.mkdirSync(uploadPath, { recursive: true });
    //     }

    //     cb(null, uploadPath);
    //   },
    //   filename: function (req, file, cb) {
    //     console.log("file::", file);
    //     cb(
    //       null,
    //       file.originalname
    //       // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    //     );
    //   },
    // });


    // // Create a new Upload
    // this.router.get("/", this.controller.init);
    // const upload = multer({
    //   storage,
    //   limits: {
    //     fileSize: 1024 * 1024 * 5
    //   },
    //   fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png") {
    //       cb(null, true);
    //     } else {
    //       return cb(new Error('Invalid mime type'));
    //     }
    //   }
    // })


    // const uploadSingleImage = upload.single('file');
    
    // Create a new Upload
    // this.router.post("/", upload.single('file'), this.controller.create);
    this.router.post("/", this.controller.create);

    // Retrieve all Uploads
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Upload with id
    this.router.get("/:id", this.controller.findOne);

    // Update a Upload with id
    this.router.put("/:id", this.controller.update);

    // Delete a Upload with id
    this.router.delete("/:id", this.controller.delete);

  }
}

export default new UploadRoutes().router;