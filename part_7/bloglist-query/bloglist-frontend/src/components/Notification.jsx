import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const message = useNotificationValue();

  if (message === '') return null;

  if (message.includes('Error:')) {
    return <div className="error">{message}</div>;
  }

  return <div className="note">{message}</div>;
};

export default Notification;
