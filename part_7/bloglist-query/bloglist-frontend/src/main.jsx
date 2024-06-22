import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// react-redux
import { Provider } from 'react-redux';
import store from './store';

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <NotificationContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </NotificationContextProvider>
      </UserContextProvider>
    </Provider>
  </React.StrictMode>
);
