import { getVideoDuration } from '../lib/youtubeApi/getVideoDuration.js';
import { getVideoIDs } from '../lib/youtubeApi/getVideoIDs.js';

export const getPlaylistDuration = async (req, res) => {
  const { apiKey, playlistId } = req.body;
  if (!apiKey || !playlistId) {
    res
      .status(400)
      .json({ error: 'Bad Request, api key or playlist id missing.' });
    return;
  }
  try {
    const playlistVideosIds = await getVideoIDs(apiKey, playlistId);
    let playlistDuration = await Promise.all(
      playlistVideosIds.map(
        async videoId => await getVideoDuration(apiKey, videoId)
      )
    );
    playlistDuration = playlistDuration.filter(duration => duration !== null);
    res.status(200).json(playlistDuration);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
