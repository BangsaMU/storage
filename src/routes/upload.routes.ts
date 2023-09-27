import { Router } from "express";
import UploadController from "../controllers/upload.controller";

class UploadRoutes {
  router = Router();
  controller = new UploadController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Upload
    this.router.get("/", this.controller.init);

    // Create a new Upload
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