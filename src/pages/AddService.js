import { Box, styled, Container, Grid, Typography } from '@mui/material';

import { AddServiceForm } from '../components/service/AddServiceForm';
import { MHidden } from '../components/@material-extend';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

export default function AddService() {
  return (
    <RootStyle title="Profile | Profile">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <AddServiceForm />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </RootStyle>
  );
}
