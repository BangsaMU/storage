import { Request, Response } from "express";
import multer from "multer";
import path from 'path';

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/../../../public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload_multer = multer({ storage: diskStorage })
 

export default class UploadController {
    
  async init(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "Init OK",
        reqQuery: req.query
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      res.status(201).json({
        message: "create OK",
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "findAll OK"
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "findOne OK",
        reqParamId: req.params.id
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "update OK",
        reqParamId: req.params.id,
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "delete OK",
        reqParamId: req.params.id
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }
}