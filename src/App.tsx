import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import { routes } from "./routes/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/table.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import GLOBAL_CONSTANTS from './GlobalConstants';

// Force an initial log of the constants
console.log("Initial GLOBAL_CONSTANTS load:", GLOBAL_CONSTANTS);

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
        <ToastContainer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: '#ff4b4b',
              },
            },
          }}
        />
      </AuthProvider>
    </Provider>
  );
}
