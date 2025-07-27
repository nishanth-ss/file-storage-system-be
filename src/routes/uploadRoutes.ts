import express from 'express';
import {upload} from '../middleware/multer';
import { deleteFile, getUploadedFiles, uploadFile } from '../controllers/uploadController';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getUploadedFiles);
router.delete('/:filename', deleteFile);

export default router;
