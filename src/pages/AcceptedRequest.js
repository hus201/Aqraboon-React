import * as React from 'react';
// material
import { styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  Stepper,
  Box,
  StepLabel,
  Button,
  Step,
  Container,
  Typography
} from '@mui/material';
// layouts
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { AcceptedReqForm, PatientReqForm } from '../components/serviceRequest';
import ApiRoot from '../Test/APiRoot';
import { AuthContext } from '../utils/ContextProvider';
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
  React.useEffect(async () => {
    const Url = new window.URL(window.location.href);
    const id = Url.searchParams.get('id');

    const url = `${ApiRoot}/Service/GetRequest?id=${id}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      }
    };
    const response = await fetch(url, options);
    if (response.ok && response.status === 200) {
      const result = await response.json();
      setRequest({ ...result.value.request });
    }
  }, [0]);
  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const [activeStep, setActiveStep] = React.useState(0);
  const [request, setRequest] = React.useState({});
  const [skipped, setSkipped] = React.useState(new Set());

  const steps = ['تفاصيل الخدمة', 'معلومات المريض'];

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

          <Box sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length && (
                <Box>
                  <Typography sx={{ mt: 2, mb: 1 }}>سيتم التواصل معك من قبل طالب الخدمة</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>اغلاق</Button>
                  </Box>
                </Box>
              )}
              <Box>
                {activeStep === 0 && <AcceptedReqForm request={request} />}
                {activeStep === 1 && <PatientReqForm request={request} />}

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    رجوع
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'تاكيد طلب الخدمة' : 'التالي'}
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
