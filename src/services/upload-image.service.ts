import { Request, Response } from "express";
import { uploadFileToS3 } from "@/src/aws";
export const uploadImageService = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const result = await uploadFileToS3(file);
    return res
      .status(200)
      .send({ message: "File uploaded successfully", data: result });
  } catch (error) {
    res.status(500).send({ message: "File upload failed", error });
  }
};
