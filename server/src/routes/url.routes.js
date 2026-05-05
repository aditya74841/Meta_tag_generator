import express from 'express';
import { handleUrl } from '../controllers/url.controller.js';

const router = express.Router();

router.post('/url', handleUrl);

export default router;
