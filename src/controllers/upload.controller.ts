import { Request, Response } from "express";
import multer from "multer";
import path from 'path';
import fs from 'fs';

import { PrismaClient } from '@prisma/client'


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

            const storage = multer.diskStorage({
                destination: function (req: Request, file, cb) {
                    const path_file = req.body.path_file; /*untuk mendapatkan param body semua param harus dikirm seblum file dikirim*/
                    const uploadPath = path.resolve(path.join(__dirname, '../../../public/uploads/' + path_file));

                    if (!fs.existsSync(uploadPath)) {
                        fs.mkdirSync(uploadPath, { recursive: true });
                    }

                    cb(null, uploadPath)
                },
                filename: function (req, file, cb) {
                    console.log("file::", file);
                    const path_file = req.body.path_file; /*untuk mendapatkan param body semua param harus dikirm seblum file dikirim*/
                    const uploadPath = path.resolve(path.join(__dirname, '../../../public/uploads/' + path_file));
                    // cb(
                    //     null,
                    //     file.originalname
                    //     // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
                    // ); 
                    if (fs.existsSync(path.join(uploadPath, file.originalname))) {
                        console.log('file ada');
                        // process.exit(0);
                        // cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) /*untuk auto rename kalo filesama*/
                        cb(null, file.originalname)
                    } else {
                        cb(null, file.originalname)
                    }
                },
            });


            // Create a new Upload 
            const upload = multer({
                storage,
                // limits: {
                //     fileSize: 1024 * 1024 * 5
                // },
                fileFilter: async (req, file, cb) => {
                    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                        const path_file = req.query.path_file || req.body.path_file || '';
                        const dir = path.resolve(path.join(__dirname, '../../../public/uploads/' + path_file));
                        var filecek = dir + '\\' + file.originalname;
                        var caption = file.fieldname;
                        var filename = file.originalname;
                        var size = file.size;
                        if (fs.existsSync(filecek)) {
                            // {
                            //     fieldname: 'file',
                            //     originalname: 'pelangi.jpg',
                            //     encoding: '7bit',
                            //     mimetype: 'image/jpeg'
                            //   }
                            console.log('file exists', file.originalname);

                            return cb(new Error('Invalid ' + file.originalname + ' exists'));

                        } else {
                            console.log('file not found!');
                            cb(null, true);
                        }

                    } else {
                        return cb(new Error('Invalid mime type'));
                    }
                }
            })

            const uploadSingleImage = upload.single('file');


            uploadSingleImage(req, res, async function (err) {


                if (err) {
                    res.status(400).json({
                        message: err.message,
                    });
                } else {

                    const file = req.file;
                    // const size = req.file?.size;
                    const base_url = 'http://localhost:8080'

                    const path_file = req.query.path_file || req.body.path_file || '';
                    const file_group = req.query.file_group || req.body.file_group || 'image';
                    const prisma = new PrismaClient()
                    const url = base_url + '/uploads/' + path_file + '/' + file?.originalname
                    const user = await prisma.gallery.create({
                        data: {
                            user_id: 0,
                            caption: file?.originalname,
                            url: url,
                            path: file?.path,
                            filename: file?.originalname,
                            size: file?.size,
                            header_type: file?.mimetype,
                            file_group: file_group,
                        },
                    })
                    console.log('save file', file);

                    res.status(201).json({
                        message: "Upload success",
                        file: file,
                    });
                }

            })




        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const prisma = new PrismaClient()
            const gallery = await prisma.gallery.findMany()
            res.status(200).json({
                message: 'success',
                data: gallery
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!",
                data: []
            });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const prisma = new PrismaClient()
            // By ID
            const gallery = await prisma.gallery.findUnique({
                where: {
                    id: parseInt(req.params.id),
                },
            })
            res.status(200).json({
                message: 'success',
                data: gallery,
                // reqParamId: req.params.id
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!",
                data: []
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