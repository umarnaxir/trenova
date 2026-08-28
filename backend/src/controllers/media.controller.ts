import { Request, Response } from 'express';
import cloudinary from '../lib/cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    const fileBuffer = req.file.buffer;

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'trenova_products' },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          console.error(error);
          return res.status(500).json({ success: false, message: 'Cloudinary upload failed' });
        }
        res.status(200).json({ success: true, url: result.secure_url });
      }
    );

    // Write buffer to stream and end
    uploadStream.end(fileBuffer);
  } catch (error: any) {
    console.error('Media upload outer error:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error during upload' });
  }
};
