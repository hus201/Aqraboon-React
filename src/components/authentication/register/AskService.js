import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  Box,
  IconButton,
  Autocomplete,
  Tooltip,
  FormHelperText,
  InputAdornment
} from '@mui/material';
import { LoadingButton, DateTimePicker } from '@mui/lab';
import GoogleMapReact from 'google-map-react';
// ----------------------------------------------------------------------
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AskService() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [valueDate, setvalueDate] = useState(new Date('2014-08-18T21:11:54'));

  const handleChangeTime = (newValue) => {
    setvalueDate(newValue);
  };

  const RegisterSchema = Yup.object().shape({
    Service: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Service is required'),
    description: Yup.string()
      .email('description must be a valid description address')
      .required('description is required'),
    Location: Yup.object().shape({
      lat: Yup.number().required('Password is required'),
      lng: Yup.number().required('Password is required')
    })
  });

  const formik = useFormik({
    initialValues: {
      Service: '',
      description: '',
      Location: { lat: 23.222, lng: 32 }
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const handleApiLoaded = (map, maps) => {
    console.log('map', map.center.lat());
    console.log('map', map.center.lng());
  };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Autocomplete
            id="size-small-outlined"
            size="small"
            options={[
              { title: 'تغير ضماد جروح', year: 2002 },
              { title: 'تغير ضماد حروق', year: 1995 },
              { title: 'ابر في العضل', year: 1991 },
              { title: 'كرسي متحرك', year: 1991 }
            ]}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...getFieldProps('Service')}
                error={Boolean(errors.Service)}
                helperText={errors.Service}
                {...params}
                label="نوع الخدمة المطلوبة"
              />
            )}
          />
          <TextField
            fullWidth
            size="small"
            autoComplete="username"
            type="description"
            multiline={Boolean(true)}
            maxRows={5}
            label="اضافة وصف"
            {...getFieldProps('description')}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
          <Box style={{ height: '300px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyC4EGFc_Y4wOspdDUmgEUu_76dBP2v6RD4' }}
              defaultCenter={{
                lat: 59.95,
                lng: 30.33
              }}
              defaultZoom={8}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              <AnyReactComponent
                {...getFieldProps('Location')}
                lat={Location.lat}
                lng={Location.lng}
                text="My Marker"
              />
            </GoogleMapReact>

            {Boolean(errors.Location) && (
              <FormHelperText style={{ color: 'red' }}>{errors.Location}</FormHelperText>
            )}

            <FormControlLabel
              control={<Checkbox size="small" defaultChecked />}
              label="استخدام موقع الحساب المدخل عند التسجيل"
            />
          </Box>
          <Tooltip
            title="يجب ان لا يقل الوقت 12 ساعة من الوقت الحالي"
            enterTouchDelay={0}
            placement="bottom"
          >
            <Box style={{ marginTop: '65px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  fullWidth
                  size="small"
                  label="اقصى مدة زمنية يمكن للخدمة الوصول فيها "
                  value={valueDate}
                  minDateTime={new Date(Date.now() + 12 * 3600 * 1000)}
                  onClick={() => {
                    console.log('f');
                  }}
                  onChange={handleChangeTime}
                  renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Tooltip>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            تاكيد طلب الخدمة
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
