// material
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';

// components
//  import LandindPage from '../components/LandingPage/landingPage';
import IsLand from '../components/Island/index';

import Page from '../components/Page';

import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
// import styled from '@emotion/styled/types/base';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="الصفحة الرئيسية | أقربون">
      <IsLand />
    </Page>
  );
}
