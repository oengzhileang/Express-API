import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Route, Tags, Post, UploadedFile } from "tsoa";
import configs from "../config";
import s3 from "../middlewares/S3";
@Tags("Upload-file")
@Route("/v1/api/upload")
export class UploadImageController {
  @Post("uploadfile")
  public async upload(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ message: string; url: string }> {
    if (!file) {
      throw new Error("No file upload");
    }

    const fileKey = `uploads/${Date.now()}-${file.originalname}`;

    const uploadParams = {
      Bucket: configs.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const result = await s3.send(new PutObjectCommand(uploadParams));
      console.log(result);

      // Construct the URL of the uploaded file
      const fileUrl = `https://${configs.AWS_BUCKET_NAME}.s3.${configs.AWS_REGION}.amazonaws.com/${fileKey}`;

      return {
        message: "File uploaded successfully",
        url: fileUrl,
      };
    } catch (error: any) {
      console.log("Upload Error", error);
      throw new Error("File Upload failed");
    }
  }
}

// // import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// // import { Route, Tags, Post, UploadedFile } from "tsoa";
// // import configs from "../config";

// // @Tags("Upload-file")
// // @Route("/v1/api/upload")
// // export class UploadImageController {
// //   @Post("uploadfile")
// //   public async upload(
// //     @UploadedFile() file: Express.Multer.File
// //   ): Promise<{ message: string; url: string }> {
// //     if (!file) {
// //       throw new Error("No file uploaded");
// //     }

// //     const s3 = new S3Client({
// //       region: configs.AWS_REGION,
// //       credentials: {
// //         accessKeyId: configs.AWS_ACCESS_KEY_ID,
// //         secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
// //       },
// //     });

// //     const fileKey = `uploads/${Date.now()}-${file.originalname}`;
// //     const uploadParams = {
// //       Bucket: configs.AWS_BUCKET_NAME,
// //       Key: fileKey,
// //       Body: file.buffer,
// //       ContentType: file.mimetype,
// //       ACL: "public-read" as "public-read", // Make the file publicly accessible
// //     };

// //     try {
// //       await s3.send(new PutObjectCommand(uploadParams));
// //       const url = `https://${configs.AWS_BUCKET_NAME}.s3.${configs.AWS_REGION}.amazonaws.com/${fileKey}`;
// //       return { message: "File uploaded successfully", url };
// //     } catch (error: any) {
// //       console.error("Upload Error", error);
// //       throw new Error("File upload failed");
// //     }
// //   }
// // }

// // private handleFile(request: express.Request): Promise<any> {
// //   const multerSingle = multer().single("file");
// //   return new Promise((resolve, reject) => {
// //     multerSingle(request, {} as express.Response, async (error) => {
// //       if (error) {
// //         reject(error);
// //       }
// //       resolve(undefined);
// //     });
// //   });
// // }

// // import {
// //   Controller,
// //   Post,
// //   Route,
// //   Tags,
// //   Request,
// //   SuccessResponse,
// //   Response,
// //   Res,
// //   TsoaResponse,
// // } from "tsoa";
// // import { uploadImageMiddleware } from "@/src/middlewares/upload-image";
// // import { Request as ExpressRequest } from "express";
// // import ProductCreateSchema from "@/src/schemas/product.schema";
// // import ProductsModel from "../database/models/products.model";
// // import { ProductTypes } from "../types/product.type";
// // @Route("upload")
// // @Tags("Upload")
// // export class UploadController extends Controller {
// //   @Post("/")
// //   @SuccessResponse("201", "Product created successfully")
// //   @Response("400", "Bad Request")
// //   public async uploadFile(
// //     @Request() request: ExpressRequest,
// //     @Res() badRequest: TsoaResponse<400, { message: string }>,
// //     @Res()
// //     successResponse: TsoaResponse<
// //       201,
// //       { message: string; product: ProductTypes }
// //     >
// //   ): Promise<void> {
// //     try {
// //       await new Promise<void>((resolve, reject) => {
// //         uploadImageMiddleware.single("image")(
// //           request,
// //           {} as any,
// //           (error: any) => {
// //             if (error) {
// //               return reject(error);
// //             }
// //             resolve();
// //           }
// //         );
// //       });

// //       // Validate form data using Joi
// //       const { error: validationError, value } = ProductCreateSchema.validate(
// //         request.body,
// //         {
// //           abortEarly: false,
// //           convert: true,
// //         }
// //       );

// //       if (validationError) {
// //         const errorMessages = validationError.details
// //           .map((detail) => detail.message)
// //           .join(", ");
// //         return badRequest(400, {
// //           message: `Validation error: ${errorMessages}`,
// //         });
// //       }

// //       const file = request.file as Express.MulterS3.File;

// //       // Create a new product document
// //       const newProduct = new ProductsModel({
// //         name: value.name,
// //         price: value.price,
// //         category: value.category,
// //         stock: value.stock,
// //         fileLocation: file.location, // S3 file URL
// //       });

// //       // Save the product to MongoDB
// //       const savedProduct = await newProduct.save();

// //       return successResponse(201, {
// //         message: "Product created successfully",
// //         product: savedProduct,
// //       });
// //     } catch (error: any) {
// //       return badRequest(400, { message: error.message });
// //     }
// //   }
// // }
