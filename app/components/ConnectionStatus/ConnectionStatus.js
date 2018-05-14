import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import styles from './ConnectionStatusStyles';

class ConnectionStatus extends Component {

  render() {
    let connectionIndicator;
    if (this.props.connectionStatus == false) {
      connectionIndicator = 'Offline';

    } else if (this.props.connectionStatus == true) {
      connectionIndicator = 'Connected';
    } else {
      connectionIndicator = 'Checking connection status';
    }

    return (
      <div>
        {connectionIndicator}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    connectionStatus: state.search.connectionStatus
  };
};


export default connect(mapStateToProps)(withStyles(styles)(ConnectionStatus));
