import { Application } from "express";
import homeRoutes from "./home.routes";
import tutorialRoutes from "./tutorial.routes";
import uploadRoutes from "./upload.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/upload", uploadRoutes);
    app.use("/api/tutorials", tutorialRoutes);
  }
}
