import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fs from 'fs';
import YouTube from 'simple-youtube-api';
import ytdl from 'ytdl-core';
import electronConfig from 'electron-config';
import { YOUTUBE_API_KEY } from '../../config';
import path from 'path';
export const SEARCH_YOUTUBE = 'SEARCH_YOUTUBE';
export const VIDEO_DOWNLOADING = 'VIDEO_DOWNLOADING';
export const VIDEO_DOWNLOAD_COMPLETE = 'VIDEO_DOWNLOAD_COMPLETE';
export const PREVIEW_VIDEO = 'PREVIEW_VIDEO';
export const CLOSE_REVIEW_DIALOG = 'CLOSE_REVIEW_DIALOG';
export const VIDEO_DOWNLOAD_PROGRESS = 'DOWNLOAD_PROGRESS';
export const SAVE_VIDEO_TO_HISTORY = 'SAVE_VIDEO_TO_HISTORY';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';
export const INTERNET_CONNECTION_STATUS = 'INTERNET_CONNECTION_STATUS';

const youtube = new YouTube(YOUTUBE_API_KEY);
const config = new electronConfig();

export const connectionStatus = (isOnline) => {
  return {
    type : INTERNET_CONNECTION_STATUS,
    isConnected : isOnline
  };
};

export const clearHistory = () => {
  return {
    type: CLEAR_HISTORY,
    payload:null
  };
};

export const saveHistory = (downloadedVideoInfo) => {

  return {
    type: SAVE_VIDEO_TO_HISTORY,
    downloadedVideoInfo: downloadedVideoInfo
  };

};

export const videoDownloading = (videoId) => {
  return {
    type: VIDEO_DOWNLOADING,
    videoId: videoId
  };
};

export const videoDownloadProgress = (payload) => {
  return {
    type: VIDEO_DOWNLOAD_PROGRESS,
    payload: payload
  };
};

export const previewVideo = (videoInfo) => {
  return {
    type: PREVIEW_VIDEO,
    videoInfo: videoInfo
  };
};

export const videoDownloadComplete = (videoId) => {
  return {
    type: VIDEO_DOWNLOAD_COMPLETE,
    videoId: videoId
  };
};

export const searchResults = (results) => {
  return {
    type: SEARCH_YOUTUBE,
    payload: results
  };
};

export const closePreviewDialog = () => {
  return {
    type: CLOSE_REVIEW_DIALOG,
    payload: null
  };
};

export const connectionStatusCreator = (isOnline) => {
  return dispatch => {
    console.log('creator',isOnline);
    dispatch(connectionStatus(isOnline));
  };
};

export const searchYoutube = (searchTerm) => {
  return dispatch => {
    dispatch(showLoading());
    youtube.searchVideos(searchTerm, 20).then(results => {
      dispatch(hideLoading());
      dispatch(searchResults(results));
    }).catch(err => {
      if (err) return console.error('Error', err);
    });
  };
};

export const clearHistoryCreator = () => {
  return dispatch => {
    dispatch(clearHistory());
  };
};

export const downloadVideo = (videoInfo) => {
  return dispatch => {
    let fileName = videoInfo.title.replace(/(?!\.[^.]+$)\.|[^\w.]+/g, '') + '.mp4';
    let video = ytdl(videoInfo.id);
    let downloadPath = path.join(config.get('downloadPath'), fileName);
    video.pipe(fs.createWriteStream(downloadPath));

    dispatch(videoDownloading(videoInfo.id));

    video.on('error', (error) => {
      dispatch(videoDownloadComplete(videoInfo.id));
      console.error(error);
    });

    video.on('end', () => {
      dispatch(videoDownloadComplete(videoInfo.id));
      dispatch(saveHistory({
        id: videoInfo.id,
        title: videoInfo.title,
        thumbnail: videoInfo.thumbnails.high.url,
        downloadPath: downloadPath
      }));

    });

    video.on('progress', (chunkLength, downloaded, total) => {

      const floatDownloaded = downloaded / total;
      let percentage = (floatDownloaded * 100).toFixed(2);

      if (percentage % 2 === 0) {
        dispatch(videoDownloadProgress({
          videoId: videoInfo.id,
          percentage: percentage,
          downloaded: (downloaded / 1024 / 1024).toFixed(2),
          total: (total / 1024 / 1024).toFixed(2)
        }));
      }
    });

  };
};
