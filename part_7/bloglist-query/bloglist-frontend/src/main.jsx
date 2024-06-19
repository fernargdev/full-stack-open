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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NotificationContextProvider>
    </Provider>
  </React.StrictMode>
);
