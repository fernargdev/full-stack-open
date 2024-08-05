import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <NotificationContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
