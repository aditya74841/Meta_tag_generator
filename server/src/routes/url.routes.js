import express from 'express';
import { handleUrl } from '../controllers/url.controller.js';
import { crawlWebsite } from '../controllers/crawl.controller.js';
import { getSeoOverview } from '../controllers/seoOverview.controller.js';

const router = express.Router();

router.post('/url', handleUrl);
router.post('/crawl', crawlWebsite);
router.post('/seo-overview', getSeoOverview);

export default router;
