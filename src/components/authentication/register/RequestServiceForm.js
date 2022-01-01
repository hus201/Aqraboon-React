import * as Yup from 'yup';
import * as React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';

// material
import {
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Stack,
  TextField,
  Box,
  Autocomplete,
  Tooltip,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  FormHelperText
} from '@mui/material';
import { LoadingButton, DateTimePicker } from '@mui/lab';
import GoogleMapReact from 'google-map-react';
// ----------------------------------------------------------------------
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function RequestServiceForm() {
  const navigate = useNavigate();
  const [valueDate, setvalueDate] = React.useState(new Date(Date.now() + 12 * 3600 * 1000));
  const [open, setOpen] = React.useState(false);
  const handleChangeTime = (newValue) => {
    setvalueDate(newValue);
  };

  const RegisterSchema = Yup.object().shape({
    Service: Yup.string().required('اختيار نوع الخدمة اجباري'),
    Location: Yup.object().shape({
      lat: Yup.number().required('يجب تحديد الموقع على الخريطة بشكل صحيح'),
      lng: Yup.number().required('يجب تحديد الموقع على الخريطة بشكل صحيح')
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleApiLoaded = (map, maps) => {
    setFieldValue('Location', { lat: map.center.lat(), lng: map.center.lng() });
  };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const { errors, touched, handleSubmit, setFieldValue, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Autocomplete
            id="size-small-outlined"
            onChange={(e, value) => setFieldValue('Service', value?.title || '')}
            size="small"
            options={[
              { title: 'تغير ضماد جروح', id: 2002 },
              { title: 'تغير ضماد حروق', id: 1995 },
              { title: 'ابر في العضل', id: 1991 },
              { title: 'كرسي متحرك', id: 1991 }
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
            onChange={(e) => setFieldValue('description', e.target.value)}
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
                  onChange={handleChangeTime}
                  minDateTime={new Date(Date.now() + 11 * 3600 * 1000)}
                  renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Tooltip>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
