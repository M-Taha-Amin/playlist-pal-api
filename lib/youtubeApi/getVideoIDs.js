import { google } from 'googleapis';

const youtube = google.youtube('v3');

export const getVideoIDs = async (apiKey, playlistId) => {
  let allVideoIds = [];
  let nextPageToken = '';

  do {
    if (allVideoIds.length >= 300) break;
    const response = await youtube.playlistItems.list({
      key: apiKey,
      playlistId,
      part: 'contentDetails',
      fields: 'items/contentDetails/videoId,nextPageToken',
      maxResults: 50,
      pageToken: nextPageToken,
    });
    const videoIds = response.data.items.map(
      item => item.contentDetails.videoId
    );

    allVideoIds = allVideoIds.concat(videoIds);
    nextPageToken = response.data.nextPageToken;
  } while (nextPageToken);

  return allVideoIds;
};
