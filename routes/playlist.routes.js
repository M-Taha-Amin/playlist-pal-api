import { Router } from 'express';
import { getPlaylistDuration } from '../controllers/playlist.controller.js';
const router = Router();

router.post('/duration', getPlaylistDuration);

export default router;