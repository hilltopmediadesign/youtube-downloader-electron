import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/actions';
import styles from './DownloadButtonStyles';
import DownloadIcon from 'material-ui-icons/FileDownload';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import electronApp from 'electron';



class DownloadButton extends Component {

  openVideo = () => {
    electronApp.remote.shell.openItem('/Users/vv1552/Movies/WhoIsSecretlyInLoveWithYouPersonalityTest.mp4');
  }

  render() {

    const { classes } = this.props;

    let downloadButton, downloadProgress;
    let videoDownloadProgressItem = this.props.videoDownloadProgress.find(x => x.videoId == this.props.videoInfo.id);
    let hasBeenDownloaded = this.props.downloadHistory.find(x => x.id == this.props.videoInfo.id);

    if (videoDownloadProgressItem != null && videoDownloadProgressItem.percentage != 100) {

      downloadProgress = <div style={{ flexGrow: 1 }}>
        <LinearProgress color="secondary" variant="determinate" value={parseInt(videoDownloadProgressItem.percentage)} />
      </div>;

      downloadButton =
        <Button size="small" disabled className={classes.button} variant="flat" color="primary">
          {videoDownloadProgressItem.percentage} %
        </Button>;

    } else if (this.props.videosCurrentlyDownloading.indexOf(this.props.videoInfo.id) !== -1) {

      downloadProgress = <div style={{ flexGrow: 1 }}><LinearProgress color="secondary" variant="indeterminate" value={100} /></div>;

      downloadButton =
        <Button size="small" disabled className={classes.button} variant="flat" color="primary">
          initializing...
        </Button>;

    } else if (this.props.videosDownloaded.indexOf(this.props.videoInfo.id) !== -1 || hasBeenDownloaded != null) {
      downloadButton =
        <Button disabled size="small" onClick={() => this.openVideo()} className={classes.button} variant="flat" color="primary">
          downloaded&nbsp;
        </Button>;
      downloadProgress = null;

    } else {
      downloadButton =
        <Button onClick={() => this.props.downloadVideo(this.props.videoInfo)} size="small" className={classes.button} variant="flat" color="primary">
          download
          <DownloadIcon className={classes.rightIcon} />
        </Button>;
    }
    return (
      <React.Fragment>
        {downloadButton}
        {downloadProgress}
      </React.Fragment>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    downloadVideo: (videoId) => dispatch(actionCreators.downloadVideo(videoId)),
  };
};

const mapStateToProps = state => {
  return {
    videosCurrentlyDownloading: state.search.videosCurrentlyDownloading,
    videosDownloaded: state.search.videosDownloaded,
    videoDownloadProgress: state.search.videoDownloadProgress,
    downloadHistory: state.search.downloadHistory
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DownloadButton));

