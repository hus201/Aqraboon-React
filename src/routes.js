import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import MainLayout from './layouts/MainLayout';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import AcceptedRequest from './pages/AcceptedRequest';
import RequestService from './pages/RequestService';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Profile from './pages/Profile';
import NotFound from './pages/Page404';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
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
        { path: 'RequestService', element: <RequestService /> },
        { path: 'AcceptedRequest', element: <AcceptedRequest /> }
      ]
    },
    {
      path: '/User',
      element: <MainLayout />,
      children: [{ path: 'Profile', element: <Profile /> }]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <RequestService /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
