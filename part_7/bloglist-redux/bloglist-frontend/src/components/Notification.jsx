import { useSelector } from 'react-redux';

const Notification = () => {
  const data = useSelector((state) => state.notifications.data);

  if (!data) {
    return null;
  }

  if (data.includes('Error:')) {
    return <div className="error">{data}</div>;
  }

  return <div className="note">{data}</div>;
};

export default Notification;
