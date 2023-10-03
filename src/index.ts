import express, { Request, Response, Application, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";

import config from "./config/config";

const { token, secret_key, secret_iv, ecnryption_method } = config


const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(` ${Date.now()} ${req.method} url:: ${req.url} `);
  const auth_token = req.query.token || req.body.token || '';

  if (auth_token != token)
    return res.status(401).json({
      message: "Auth!"
    });
  next()
}
export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8081"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.use(requestLogger)
  }
}