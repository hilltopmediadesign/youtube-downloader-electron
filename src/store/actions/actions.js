import { showLoading, hideLoading } from 'react-redux-loading-bar'

const electronApp = window.require('electron').remote;
const fs = electronApp.require('fs');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBQ2ByTiY1JRYJYjl-yUPdPEFDw4J3bUbE');
const ytdl = require('ytdl-core');
const electronConfig = window.require('electron-config');
const config = new electronConfig();

export const SEARCH_YOUTUBE = 'SEARCH_YOUTUBE';
export const VIDEO_DOWNLOADING = 'VIDEO_DOWNLOADING';
export const VIDEO_DOWNLOAD_COMPLETE = 'VIDEO_DOWNLOAD_COMPLETE';
export const PREVIEW_VIDEO = 'PREVIEW_VIDEO';
export const CLOSE_REVIEW_DIALOG = 'CLOSE_REVIEW_DIALOG';

export const videoDownloading = (videoId) => {
    return {
        type: VIDEO_DOWNLOADING,
        videoId: videoId
    }
}

export const previewVideo = (videoInfo) => {
    return {
        type: PREVIEW_VIDEO,
        videoInfo: videoInfo
    }
}

export const videoDownloadComplete = (videoId) => {
    return {
        type: VIDEO_DOWNLOAD_COMPLETE,
        videoId: videoId
    }
}

export const searchResults = (results) => {
    return {
        type: SEARCH_YOUTUBE,
        payload: results
    }
}

export const closePreviewDialog = (results) => {
    return {
        type: CLOSE_REVIEW_DIALOG,
        payload: null
    }
}



export const searchYoutube = (searchTerm) => {
    return dispatch => {
        dispatch(showLoading())
        youtube.searchVideos(searchTerm, 20).then(results => {
            dispatch(hideLoading())
            console.log('search results', results);
            dispatch(searchResults(results));
        }).catch(err => {
            if (err) return console.error('Error', err);
        });
    }
};

export const downloadVideo = (videoInfo) => {
    return dispatch => {
        let fileName = videoInfo.title.replace(/(?!\.[^.]+$)\.|[^\w.]+/g, '') + '.mp4';
        console.log('Filename',fileName);
        let video = ytdl(videoInfo.id);
        video.pipe(fs.createWriteStream(config.get('downloadPath') + fileName));
        dispatch(videoDownloading(videoInfo.id));

        video.on('error', (error) => {
            dispatch(videoDownloadComplete(videoInfo.id));
            console.log(error);
        });

        video.on('end', () => {
            dispatch(videoDownloadComplete(videoInfo.id));
        });
    }
};
