import * as Yup from 'yup';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, Autocomplete, Chip, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import Mune from './Menu';

import Services from '../../../Test/Services';
// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  iconClass: {
    paddingBottom: 0
  }
}));

export default function RegisterVolunteerForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [valueServices, setvalueServices] = useState();
  const [showConfPassword, setShowConfPassword] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    sex: Yup.string().required('sex required'),
    age: Yup.string().required('age required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number must be a valid Phone number')
      .required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    confPassword: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      sex: '',
      age: '',
      confPassword: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  const onChangeSex = (e) => {
    console.log('ee', e.target.value);
  };
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
              { label: 'male', value: 0 },
              { label: 'female', value: 1 }
            ]}
            onSort={onChangeSex}
          />
          <TextField
            fullWidth
            label="age"
            {...getFieldProps('age')}
            size="small"
            error={Boolean(touched.age && errors.age)}
            helperText={touched.age && errors.age}
          />
          <TextField
            fullWidth
            autoComplete="phone"
            type="tel"
            label="phone number"
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

          <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={valueServices}
            onChange={(event, newValue) => {
              setvalueServices([...newValue]);
            }}
            options={[...Services]}
            getOptionLabel={(option) => option.Title}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip label={option.Title} {...getTagProps({ index })} />
              ))
            }
            size="small"
            renderInput={(params) => (
              <TextField size="small" {...params} label="Services you provieded" />
            )}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
