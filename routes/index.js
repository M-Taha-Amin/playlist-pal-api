const { Router } = require('express');
const router = Router();
const { getPlaylistDuration } = require('../controllers/index');

router.get('/', (req, res) => {
  const html = `
  <h3>This api currently only have one route for getting timestamps of a youtube playlist.</h3> 
  <p>Endpoint for that route is <code>/api/data/?apiKey=key&playlistId=id.</code> Replace apiKey and id with your key and playlistId.</p>
  `;
  res.status(200).send(html);
});

router.get('/api/data', async (req, res, next) => {
  const { apiKey, playlistId } = req.query;
  if (!apiKey || !playlistId) {
    res
      .status(401)
      .json({ error: 'Invalid request, query parameters are missing.' });
    return;
  }
  try {
    const playlistDuration = await getPlaylistDuration(apiKey, playlistId);
    res.status(200).json(playlistDuration);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  return res.status(400).json({ error: 'Invalid API key or Playlist Id' });
});

module.exports = router;
