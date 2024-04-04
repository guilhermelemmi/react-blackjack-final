import express from 'express';
import { getRules } from '../controllers/rules.js';

const router = express.Router();

router.get('/', getRules);

export default router;
