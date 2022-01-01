// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { AcceptedReqForm } from '../components/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    paddingTop: theme.spacing(8)
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(8)
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2, 0)
}));

// ----------------------------------------------------------------------

export default function AcceptedRequest() {
  return (
    <RootStyle title="Login | Minimal-UI">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            لقد تلقيت طلبا جديدا
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              طلب خدمة
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>تفاصيل الطلب </Typography>
          </Stack>
          <AcceptedReqForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
