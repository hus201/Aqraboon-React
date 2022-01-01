import { Box, styled, Container, Grid, Typography } from '@mui/material';

import { AccountProfile } from '../components/Profile/AccountProfile';
import { AcountDetails } from '../components/Profile/AcountDetails';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <RootStyle title="Profile | Profile">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AcountDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </RootStyle>
  );
}
