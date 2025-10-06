import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/index.jsx'
import { RouterProvider } from 'react-router'
import { Bounce, ToastContainer } from 'react-toastify'
import store from "../src/redux/store.js"
import { Provider } from 'react-redux'
import 'react-html5-camera-photo/build/css/index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        stacked
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
