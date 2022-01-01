import * as Yup from 'yup';
import { useState, forwardRef } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
// material
import { Stack, TextField, Box, Autocomplete, Tooltip, FormHelperText } from '@mui/material';
import { LoadingButton, DateTimePicker } from '@mui/lab';
import GoogleMapReact from 'google-map-react';
// ----------------------------------------------------------------------
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const NumberFormatCustom = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      // thousandSeparator
      isNumericString
      max={100}
      min={1}
      // prefix="$"
    />
  );
});

export default function PatientForm() {
  const navigate = useNavigate();
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

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate style={{ minWidth: '500px' }} onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            size="small"
            label="اسم المريض"
            {...getFieldProps('description')}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
          <TextField
            fullWidth
            size="small"
            label="العمر"
            InputProps={{
              inputComponent: NumberFormatCustom
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="اضافة وصف"
            {...getFieldProps('description')}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
}
