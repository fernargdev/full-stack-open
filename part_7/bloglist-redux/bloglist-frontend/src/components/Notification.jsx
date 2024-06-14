import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification.message);

  if (message === '') return null;

  if (message.includes('Error:')) {
    return <div className="error">{message}</div>;
  }

  return <div className="note">{message}</div>;
};

export default Notification;
