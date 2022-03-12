import * as Yup from 'yup';
import React, { useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { LoadingButton, DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// material
import {
  Stack,
  TextField,
  IconButton,
  Autocomplete,
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  FormControl,
  FormHelperText
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AuthContext } from '../../../utils/ContextProvider';
import ApiRoot from '../../../Test/APiRoot';
import { GetLocationMap } from '../../../utils/Maps';
import Mune from './Menu';
// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  iconClass: {
    paddingBottom: 0
  }
}));

export default function RegisterForm() {
  const classes = useStyles();
  const Navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [error, setError] = useState(false);
  const [Gender, setGender] = useState(0);
  const [helperText, setHelperText] = useState('Choose wisely');
  const [AsVolunteer, setAsVolunteer] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    birthDate: Yup.date().required('birthDate required').min('1940-01-01').max('2005-1-1'),
    email: Yup.string().email('Email must be a valid email address').nullable(),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number must be a valid Phone number')
      .required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    confPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    lat: Yup.string().required('location is required'),
    lng: Yup.string().required('location is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      birthDate: '0000-00-00',
      confPassword: '',
      password: '',
      lat: '',
      lng: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      SubmitForm(values);
    }
  });

  const SubmitForm = async (values) => {
    const { firstName, lat, lng, lastName, phone, email, confPassword, password, birthDate } =
      values;

    const User = {
      Name: `${firstName} ${lastName}`,
      Email: email,
      Password: password,
      ConfirmPassword: confPassword,
      BirthDate: birthDate,
      Phone: phone,
      Gender,
      Lng: lng,
      Lat: lat
    };

    const data = new FormData();
    data.append('strUser', JSON.stringify(User));

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };

    const url = `${ApiRoot}/Login/Register`;

    try {
      const response = await fetch(url, options);
      if (response.ok && response.status === 200) {
        const result = await response.json();
        const _user = { ...result.value.user, token: result.value.token };
        authContext.setUser(_user);
        return <Navigate to="/" />;
      }
      setSubmitting(false);
      setHelperText('Sorry, wrong answer!');
      setError(true);
      return <></>;
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const handleChangeLocation = (lat, lng) => {
    setFieldValue('lat', lat);
    setFieldValue('lng', lng);
  };

  const {
    errors,
    touched,
    handleSubmit,
    setSubmitting,
    setFieldValue,
    isSubmitting,
    getFieldProps
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              size="small"
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              size="small"
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Mune
            options={[
              { label: 'male', value: 1 },
              { label: 'female', value: 2 }
            ]}
            onSort={onChangeGender}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              maxDate={new Date('2005-01-01')}
              minDate={new Date('1940-01-01')}
              fullWidth
              label="birthDate"
              inputProps={{
                autocomplete: 'new-date',
                form: {
                  autocomplete: 'off'
                }
              }}
              value={formik.values.birthDate}
              inputFormat="MM/dd/yyyy"
              onChange={(value) => {
                setFieldValue('birthDate', value);
              }}
              renderInput={(params) => (
                <TextField
                  inputProps={{
                    autocomplete: 'new-date',
                    form: {
                      autocomplete: 'off'
                    }
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            autoComplete="username"
            type="tel"
            label="phone number"
            inputProps={{
              autocomplete: 'new-phone',
              form: {
                autocomplete: 'off'
              }
            }}
            {...getFieldProps('phone')}
            size="small"
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="email"
            inputProps={{
              autocomplete: 'new-phone',
              form: {
                autocomplete: 'off'
              }
            }}
            {...getFieldProps('email')}
            size="small"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              autocomplete: 'new-phone',
              form: {
                autocomplete: 'off'
              },
              endAdornment: (
                <InputAdornment position="end" className={classes.iconClass}>
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            size="small"
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfPassword ? 'text' : 'password'}
            label="confirm Password"
            {...getFieldProps('confPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className={classes.iconClass}>
                  <IconButton edge="end" onClick={() => setShowConfPassword((prev) => !prev)}>
                    <Icon icon={showConfPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            size="small"
            error={Boolean(touched.confPassword && errors.confPassword)}
            helperText={touched.confPassword && errors.confPassword}
          />
          <Grid item md={12} xs={12}>
            <Box style={{ height: '300px' }}>
              <GetLocationMap setLocation={handleChangeLocation} />
            </Box>
            <FormGroup>
              {Boolean(touched.lat && errors.lat) && (
                <FormHelperText style={{ color: 'red' }}>
                  {touched.lat && errors.lat}
                </FormHelperText>
              )}
            </FormGroup>
          </Grid>
          <FormControl fullWidth error={error} variant="standard">
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
