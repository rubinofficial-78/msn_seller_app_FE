import React from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { routes } from './routes';

const AppRoutes = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;