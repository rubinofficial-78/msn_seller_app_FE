import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import { routes } from './routes/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/table.css';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
      </AuthProvider>
    </Provider>
  );
}