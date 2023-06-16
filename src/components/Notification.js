import PropTypes from 'prop-types';

const Notification = ({ message, handle }) => {
  if (message === null) {
    return null;
  }
  if (handle === 'success') {
    return <div className="notif">{message}</div>;
  }
  if (handle === 'error') {
    return <div className="error">{message}</div>;
  }
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
};

export default Notification;
