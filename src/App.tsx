import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import { routes } from "./routes/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/table.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
        <ToastContainer />
      </AuthProvider>
    </Provider>
  );
}
