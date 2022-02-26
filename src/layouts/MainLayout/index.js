import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { MHidden } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 1;
const APP_BAR_DESKTOP = 1;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: APP_BAR_MOBILE,
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
    paddingRight: 0
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24
    //  paddingLeft: theme.spacing(2),
    //  paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <MHidden width="lgUp">
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      </MHidden>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
