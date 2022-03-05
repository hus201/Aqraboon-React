import * as React from 'react';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Stepper,
  Step,
  Stack,
  StepLabel,
  Button,
  Card,
  Container,
  Typography
} from '@mui/material';

// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RequestServiceForm, PatientForm, VolunteerForm } from '../components/serviceRequest';
import { AuthContext } from '../utils/ContextProvider';
import ApiRoot from '../Test/APiRoot';
// import AuthSocial from '../components/authentication/AuthSocial';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(10)
  }
}));
const steps = ['تفاصيل الخدمة', 'معلومات المريض', 'معلومات مقدم الخدمة'];
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
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 0)
}));

const SpanStyled = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700
}));

const DescSpan = styled('span')(({ theme }) => ({
  ...theme.typography.h4
}));

// ----------------------------------------------------------------------

export default function RequestService() {
  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [Images, setImages] = React.useState([
    'https://image.freepik.com/free-vector/flat-hand-drawn-patient-taking-medical-examination_52683-57828.jpg',
    'https://image.freepik.com/free-vector/person-with-cold-concept-illustration_114360-1594.jpg',
    'https://image.freepik.com/free-vector/group-doctors-standing-hospital-building-team-practitioners-ambulance-car_74855-14034.jpg'
  ]);

  /// ------------- form
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  //  --------------end form
  const setObjValues = (name, val) => {
    console.log('[name]', [name], val);
    console.log('[values]', values);
    setValues({ ...values, [name]: val });
  };

  const isStepOptional = (step) => step === 2;
  const isStepSkipped = (step) => skipped.has(step);
  const handleSubmit = () => {
    const request = {
      Description: values?.description,
      Lattiud: values?.loc?.lat,
      Longtiud: values?.loc?.lng,
      SeviceTypeId: values?.SeviceTypeId,
      PAge: values?.Age,
      PDescription: values?.Pdescription,
      PName: values?.Name,
      VGender: values?.VolunteerSex,
      PGender: values?.Sex,
      ExpireTime: values?.ExpTime
    };
    console.log('request => ', request);
    const data = new FormData();
    data.append('request', JSON.stringify(request));
    data.append('CurrentInfo', Boolean(values?.CurrentInfo));
    data.append('CurrentLocation', Boolean(values?.UserLocation));
    const url = `${ApiRoot}/Service/SaveRequest`;
    const options = {
      method: 'post',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      },
      body: data
    };
    const response = fetch(url, options);
    if (response.ok && response.state === 200) {
      const result = response.json();
      console.log('result', result);
    }
  };
  const handleNext = async () => {
    if (activeStep === 0) {
      if (!(values.SeviceTypeId && values.description && values?.Loc?.lat && values?.Loc?.lng)) {
        const errs = {
          SeviceTypeId: true,
          description: true,
          Loc: true,
          ExpTime: true,
          ms: {
            SeviceTypeId: 'this field is required',
            description: 'this field is required',
            ExpTime: 'this field is required',
            Loc: 'this field is required'
          }
        };
        setErrors({ ...errs });
        //  return;
      }
    } else if (activeStep === 1) {
      if (!(values.Name && values.Pdescription && values.Age && values.Sex)) {
        const errs = {
          Name: true,
          Pdescription: true,
          Age: true,
          Sex: true,
          ms: {
            Name: 'this field is required',
            Pdescription: 'this field is required',
            Age: 'this field is required',
            Sex: 'this field is required'
          }
        };
        setErrors({ ...errs });
        // return;
      }
    } else if (activeStep === 2) {
      if (!values.VolunteerSex) {
        const errs = {
          VolunteerSex: true,
          ms: {
            VolunteerSex: 'this field is required'
          }
        };
        setErrors({ ...errs });
        return;
      }
      if (values.VolunteerSex) {
        handleSubmit();
      }
    }

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
    <RootStyle title="Register | Minimal-UI">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            <SpanStyled> {' الاقربون اولى بالمعروف,'}</SpanStyled>
            <br />
            <DescSpan> {'  مشروع تبادل الخدمات الطبية بين افراد الحي '}</DescSpan>
          </Typography>
          <img alt="register" src={Images[activeStep]} />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              طلب خدمة طبية
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              جميع الخدمات على هذا الموقع مجانية
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                  }
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
              {activeStep === steps.length ? (
                <Box>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finishe
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  {activeStep === 0 && (
                    <RequestServiceForm
                      values={values}
                      setObjValues={setObjValues}
                      errors={errors}
                    />
                  )}
                  {activeStep === 1 && (
                    <PatientForm
                      User={User}
                      values={values}
                      setObjValues={setObjValues}
                      errors={errors}
                    />
                  )}
                  {activeStep === 2 && (
                    <VolunteerForm values={values} setObjValues={setObjValues} errors={errors} />
                  )}

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
              )}
            </Stack>
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
