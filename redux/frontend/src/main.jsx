import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Homescreen from './screens/Homescreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoutes from './components/privateRoutes.jsx';
import AdminHomeScreen from './screens/AdminHomeScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={ <Homescreen />} />
      <Route path='/login' element={ <LoginScreen />} />
      <Route path='/register' element={ <RegisterScreen />} />
     
      {/* Private Routes*/}
      <Route path='' element={<PrivateRoutes />}>
      <Route path='/profile' element={ <ProfileScreen />} />
      <Route path='/admin' element={ <AdminHomeScreen />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
)
