import { google } from 'googleapis';

const youtube = google.youtube('v3');

export const getVideoDuration = async (apiKey, videoId) => {
  const response = await youtube.videos.list({
    key: apiKey,
    id: videoId,
    part: 'contentDetails',
    fields: 'items/contentDetails/duration',
  });

  if (response.data.items.length === 0) {
    return null;
  }

  return response.data.items[0].contentDetails.duration;
};
