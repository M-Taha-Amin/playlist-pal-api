const getVideoIDs = require('../utils/getVideoIDs');
const getVideoDuration = require('../utils/getVideoDuration');

const getPlaylistDuration = async (API_KEY, playlistId) => {
  const videoIds = await getVideoIDs(API_KEY, playlistId);
  const videoDurations = await Promise.all(
    videoIds.map(async id => await getVideoDuration(API_KEY, id))
  );
  return videoDurations;
};

module.exports = { getPlaylistDuration };
