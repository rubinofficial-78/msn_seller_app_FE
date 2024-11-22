import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { routes } from './routes/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </AuthProvider>
  );
}