import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import MainLayout from './layouts/MainLayout';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AcceptedRequest from './pages/AcceptedRequest';
import AcceptedList from './pages/AcceptedList';
import NeedRequestsList from './pages/NeedRequestsList';
import ProvidedList from './pages/ProvidedList';
import RequestService from './pages/RequestService';
import RequestAttatchment from './pages/RequestAttatchment';
import ApproveService from './pages/ApproveService';
import DashboardApp from './pages/DashboardApp';
import AddServiceType from './pages/AddServiceType';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import AddService from './pages/AddService';
import ServicesTypes from './pages/ServicesTypes';
import NotFound from './pages/Page404';
import { AuthContext } from './utils/ContextProvider';

export default function Router() {
  const authContext = useContext(AuthContext);
  const User = authContext.getUser();
  return useRoutes([
    {
      path: '/dashboard',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/Service',
      element: <MainLayout />,
      children: [
        {
          path: 'RequestService',
          element: User?.IsLogedIn ? <RequestService /> : <Navigate to="/dashboard" />
        },
        {
          path: 'Reports',
          element: User?.role === 'Admin' ? <Reports /> : <Navigate to="/dashboard" />
        },
        {
          path: 'ServicesTypes',
          element: User?.role === 'Admin' ? <ServicesTypes /> : <Navigate to="/dashboard" />
        },
        {
          path: 'AddServiceType',
          element: User?.role === 'Admin' ? <AddServiceType /> : <Navigate to="/dashboard" />
        },
        {
          path: 'ApproveService',
          element: User?.role === 'Admin' ? <ApproveService /> : <Navigate to="/dashboard" />
        },
        {
          path: 'RequestAttatchment',
          element: User?.IsLogedIn ? <RequestAttatchment /> : <Navigate to="/dashboard" />
        },
        {
          path: 'AcceptedList',
          element: User?.IsLogedIn ? <AcceptedList /> : <Navigate to="/dashboard" />
        },
        {
          path: 'NeedRequestsList',
          element: User?.IsLogedIn ? <NeedRequestsList /> : <Navigate to="/dashboard" />
        },
        {
          path: 'ProvidedList',
          element: User?.IsLogedIn ? <ProvidedList /> : <Navigate to="/dashboard" />
        },
        {
          path: 'AcceptedRequest',
          element: User?.IsLogedIn ? <AcceptedRequest /> : <Navigate to="/dashboard" />
        },
        {
          path: 'AddService',
          element: User?.IsLogedIn ? <AddService /> : <Navigate to="/dashboard" />
        }
      ]
    },
    {
      path: '/User',
      element: <MainLayout />,
      children: [
        {
          path: 'Profile',
          element: User?.IsLogedIn ? <Profile /> : <Navigate to="/dashboard" />
        }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        {
          path: 'login',
          element: User?.IsLogedIn ? <Navigate to="/dashboard" /> : <Login />
        },
        {
          path: 'register',
          element: User?.IsLogedIn ? <Navigate to="/dashboard" /> : <Register />
        },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
