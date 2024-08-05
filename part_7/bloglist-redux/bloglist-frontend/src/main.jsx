// react
import React from 'react';
import ReactDOM from 'react-dom/client';

// app
import App from './App';
import GlobalStyles from './styles/Global.styled';

// redux
import { Provider } from 'react-redux';
import store from './store';

// router
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
