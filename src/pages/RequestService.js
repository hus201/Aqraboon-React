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
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RequestServiceForm, PatientForm, VolunteerForm } from '../components/serviceRequest';
import { AuthContext } from '../utils/ContextProvider';
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
  const [Validation, setValidation] = React.useState({ FirstStep: false, SecondStep: false });

  /// ------------- formik
  const RegisterSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, 'الاسم قصير جدا!')
      .max(50, 'الاسم طويل جدا!')
      .required('الاسم اجباري'),
    Age: Yup.number().required('العمر اجباري'),
    Sex: Yup.string().required('تحديد جنس المريض اجباري'),
    SeviceTypeId: Yup.number().required(),
    description: Yup.string().nullable(),
    Lat: Yup.string().required(),
    Lng: Yup.string().required(),
    UserLocation: Yup.boolean().required()
  });

  const formik = useFormik({
    initialValues: {
      Sex: '',
      Name: User.name,
      Age: '',
      SeviceTypeId: '',
      description: '',
      Lat: User.lat,
      Lng: User.lng,
      UserLocation: true
    },
    validationSchema: RegisterSchema,
    onSubmit: (valuse) => {}
  });

  const { handleSubmit, validateField } = formik;
  //  --------------end formik

  const [RenderComponent, setRenderComponent] = React.useState([
    <RequestServiceForm formik={formik} />,
    <PatientForm formik={formik} />,
    <VolunteerForm formik={formik} />
  ]);

  const isStepOptional = (step) => step === 2;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = async () => {
    // const validated = await Promise.all([
    //   validateField('SeviceTypeId'),
    //   validateField('UserLocation'),
    //   validateField('Lng'),
    //   validateField('Lat'),
    //   validateField('description')
    // ]);
    // const invalidFields = validated.filter((v) => v === undefined);
    // if (invalidFields.length !== 0) return;

    if (activeStep === 1) {
      const validFlag = validateField('Age') && validateField('Name') && validateField('Sex');
      if (!validFlag) {
        return;
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
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Box>
                      {RenderComponent[activeStep]}
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
                  </Form>
                </FormikProvider>
              )}
            </Stack>
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
