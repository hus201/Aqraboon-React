import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Stack, Button } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  paddingTop: '57px',
  height: '713px',
  position: 'fixed',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  marginRight: '0px !important',
  marginLeft: '50% !important',
  width: '100% !important',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="انضم الينا | أقربون">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }}>
            شاركنا الان في منصة اقربون واحصل او قدم المساعدة الى المرضى في المناطق المحيطة بك
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              انشاء حساب جديد
            </Typography>
          </Box>
          <Stack spacing={3}>
            <RegisterForm />
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
