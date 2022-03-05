import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar, IconButton } from '@mui/material';
// components
import { MHidden } from '../../components/@material-extend';
//

import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Logo from '../../components/Logo';
import MainLayNavSection from '../../components/MainLayNavSection';
import sidebarConfig from './SidebarConfig';
import { AuthContext } from '../../utils/ContextProvider';
// ----------------------------------------------------------------------

//  const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    width: '100%'
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

const BoxStyled = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 20
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

const DivStyle = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'row'
});

export default function DashboardNavbar({ onOpenSidebar }) {
  const authContext = useContext(AuthContext);
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgDown">
          <DivStyle>
            <Box sx={{ px: 2.5, py: 3 }}>
              <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
                <Logo />
              </Box>
            </Box>
            {authContext.User?.IsLogedIn && (
              <MainLayNavSection
                navConfig={sidebarConfig.filter((item) =>
                  Boolean(!item.ISVolunteer || authContext.User?.ISVolunteer)
                )}
              />
            )}
            {!authContext.User?.IsLogedIn && (
              <MHidden width="lgDown">
                <BoxStyled>
                  <Button component={RouterLink} to="/login" size="medium">
                    login
                  </Button>
                  <Button component={RouterLink} to="/register" size="medium">
                    register
                  </Button>
                </BoxStyled>
              </MHidden>
            )}
            <Box sx={{ flexGrow: 1 }} />
          </DivStyle>
        </MHidden>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          {authContext.User?.IsLogedIn && (
            <>
              <NotificationsPopover />
              <AccountPopover />
            </>
          )}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
