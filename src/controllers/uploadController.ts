import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY!,
  secretAccessKey: process.env.AWS_SECRET_KEY!,
  region: process.env.AWS_REGION!,
});

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  const fileContent = fs.readFileSync(req.file.path);

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: req.file.originalname,
    Body: fileContent,
    ContentType: req.file.mimetype,
  };

  try {
    const result = await s3.upload(params).promise();
    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      filename: req.file.originalname,
      url: result.Location, 
    });
  } catch (err) {
    console.error('S3 Upload Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload to S3',
    });
  };
}

export const getUploadedFiles = async (req: Request, res: Response) => {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME!,
    });

    const response = await s3Client.send(listCommand);
    const files = response.Contents || [];

    const fileList = await Promise.all(
      files.map(async (file) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: file.Key!,
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour

        return {
          filename: file.Key!,
          url: signedUrl,
        };
      })
    );

    return res.status(200).json({
      success: true,
      files: fileList,
    });
  } catch (err) {
    console.error('Failed to list files from S3:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to read uploaded files from S3',
    });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const { filename } = req.params;

  if (!filename) {
    return res.status(400).json({
      success: false,
      message: 'Filename is required',
    });
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: filename,
    });

    await s3Client.send(command);

    return res.status(200).json({
      success: true,
      message: `File "${filename}" deleted successfully`,
    });
  } catch (err) {
    console.error('S3 Delete Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete file from S3',
    });
  }
};
