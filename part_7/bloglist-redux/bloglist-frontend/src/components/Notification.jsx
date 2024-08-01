import { useSelector } from 'react-redux';
import {
  Notification as NotificationStyled,
  Note,
  Error,
} from '../styles/Components.styled';

const Notification = () => {
  const data = useSelector((state) => state.notifications.data);

  if (!data) {
    return <NotificationStyled data-testid="notification"></NotificationStyled>;
  }

  if (data.includes('Error:')) {
    return <Error data-testid="error">{data}</Error>;
  }

  return <Note data-testid="note">{data}</Note>;
};

export default Notification;
