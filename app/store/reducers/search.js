import * as actionTypes from '../actions/actions';
import update from 'immutability-helper';
import electronConfig from 'electron-config';


const config = new electronConfig();

const initialState = {
  searchResults: [],
  videosCurrentlyDownloading: [],
  videosDownloaded: [],
  preview: {
    showPreview: false,
    previewVideoInfo: null
  },
  videoDownloadProgress: [],
  downloadHistory: [...config.get('downloadHistory') || []],
  connectionStatus: 'connecting'

};

const reducer = (state = initialState, action) => {

  switch (action.type) {

  case actionTypes.INTERNET_CONNECTION_STATUS: {

    let connectioStatus = state.connectionStatus;
    if (connectioStatus === action.isConnected) {
      return {
        ...state
      };
    }

    return {
      ...state,
      connectionStatus: action.isConnected
    };
  }

  case actionTypes.SEARCH_YOUTUBE: {
    return {
      ...state,
      searchResults: action.payload
    };
  }
  case actionTypes.VIDEO_DOWNLOADING: {

    let currentDownloadingVideos = [...state.videosCurrentlyDownloading];
    currentDownloadingVideos.push(action.videoId);

    return {
      ...state,
      videosCurrentlyDownloading: currentDownloadingVideos
    };
  }
  case actionTypes.VIDEO_DOWNLOAD_COMPLETE: {
    let currentDownloadingVideos = [...state.videosCurrentlyDownloading];
    let index = currentDownloadingVideos.indexOf(action.videoId);
    currentDownloadingVideos.splice(index, 1);

    return {
      ...state,
      videosCurrentlyDownloading: currentDownloadingVideos,
    };
  }

  case actionTypes.VIDEO_DOWNLOAD_PROGRESS: {
    let videoDownloadProgress = [...state.videoDownloadProgress];
    let index = videoDownloadProgress.findIndex(x => x.videoId == action.payload.videoId);

    if (index === -1) {
      index = state.videoDownloadProgress.push(action.payload);
      index--;
    }

    return update(state, {
      videoDownloadProgress: {
        [index]: {
          percentage: { $set: action.payload.percentage }
        }
      }
    });

  }

  case actionTypes.PREVIEW_VIDEO: {

    return {
      ...state,
      preview: {
        showPreview: true,
        previewVideoInfo: action.videoInfo
      }
    };

  }

  case actionTypes.CLOSE_REVIEW_DIALOG: {

    return {
      ...state,
      preview: {
        showPreview: false,
        previewVideoInfo: null
      }
    };

  }

  case actionTypes.CLEAR_HISTORY: {
    console.log('here');
    config.delete('downloadHistory');
    console.log(config.store);

    return {
      ...state,
      downloadHistory: []
    };
  }

  case actionTypes.SAVE_VIDEO_TO_HISTORY: {

    //downloadedVideoInfo
    // {
    //   id: videoInfo.id,
    //   title: videoInfo.title,
    //   thumbnail: videoInfo.thumbnails.high.url,
    //   downloadPath: downloadPath
    // }

    let downloadHistory = [...state.downloadHistory];

    if (downloadHistory.find(x => x.id == action.downloadedVideoInfo.id) != null) {
      console.log('Video found');
    } else {
      console.log('Video NOT found');
      downloadHistory.push(action.downloadedVideoInfo);
      config.set('downloadHistory', downloadHistory);
    }

    return {
      ...state,
      downloadHistory: downloadHistory
    };

  }

  default:
    return state;
  }

};

export default reducer;
