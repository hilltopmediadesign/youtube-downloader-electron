const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {

    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: 'green',
    '&:hover': {
      backgroundColor: 'green',
    },
  },
  fabProgress: {
    color: 'green',
    position: 'relative',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '150%',
    marginTop: -12,
    marginLeft: -12,
  }
};

export default styles; 
