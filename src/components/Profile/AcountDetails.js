import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  TextField
} from '@mui/material';
import axios from 'axios';
import SnackBar from '../SnackBar';
import ApiRoot from '../../Test/APiRoot';
import { AuthContext } from '../../utils/ContextProvider';
import { GetLocationMap, DisplayPoint } from '../../utils/Maps';
import { UpdateUser } from '../../utils/UpdateUserInfo';

export const AcountDetails = () => {
  React.useEffect(async () => {
    const Url = new window.URL(window.location.href);
    const id = Url.searchParams.get('id');
    setId(id);
    if (id) {
      rest();
      const url = `${ApiRoot}/User/GetMember?id=${id}`;
      const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${User.token}`
        }
      };
      try {
        const response = await fetch(url, options);
        if (response.ok && response.status === 200) {
          const result = await response.json();
          console.log('result', result);
          setFieldValue('firstName', result.name.split(' ')[0]);
          setFieldValue('lastName', result.name.split(' ')[1]);
          setFieldValue('email', result.email);
          setFieldValue('phone', result.phone);
          setFieldValue('lat', result.lat);
          setFieldValue('lng', result.lng);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [0]);

  const rest = () => {
    setFieldValue('firstName', '');
    setFieldValue('lastName', '');
    setFieldValue('email', '');
    setFieldValue('phone', '');
    setFieldValue('lat', '');
    setFieldValue('lng', '');
  };

  const [Id, setId] = React.useState(1);
  const authContext = React.useContext(AuthContext);
  const [Message, setMessage] = React.useState('');
  const User = authContext.getUser();
  const _user = {
    firstName: User.name.split(' ')[0],
    lastName: User.name.split(' ')[1],
    email: User.email,
    phone: User.phone,
    lat: User.lat,
    lng: User.lng
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'قصير جدا!').max(50, 'طويل جدا!').required('الاسم الأول مطلوب'),
    lastName: Yup.string().min(2, 'قصير جدا!').max(50, 'طويل جدا!').required('اسم العائلة مطلوب'),
    email: Yup.string()
      .email('يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالحًا')
      .nullable(),
    phone: Yup.string()
      .matches(phoneRegExp, 'يجب أن يكون رقم الهاتف صالحًا')
      .required('رقم الهاتف مطلوب'),
    lat: Yup.string().required('الموقع مطلوب'),
    lng: Yup.string().required('الموقع مطلوب')
  });
  const formik = useFormik({
    initialValues: {
      firstName: User.name.split(' ')[0],
      lastName: User.name.split(' ')[1],
      email: User.email,
      phone: User.phone,
      lat: User.lat,
      lng: User.lng
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      SubmitForm(values);
    }
  });
  const config = {
    headers: {
      Authorization: `Bearer ${User.token}`
    }
  };
  const SubmitForm = async (values) => {
    const { firstName, lat, lng, lastName, phone, email } = values;
    const User = {
      Name: `${firstName} ${lastName}`,
      Email: email,
      Phone: phone,
      Lng: lng,
      Lat: lat
    };

    const data = new FormData();
    data.append('User', JSON.stringify(User));
    const url = `${ApiRoot}/User/Update`;
    axios.post(url, data, config).then((res) => {
      const _user = { ...res.data.value.user, token: res.data.value.token };
      authContext.setUser(_user);
      UpdateUser(authContext);
    });
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
    values,
    getFieldProps
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="" title="المعلومات الشخصية" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  disabled={Id}
                  label="الاسم الاول"
                  name="firstName"
                  required
                  variant="outlined"
                  onChange={(e) => {
                    setFieldValue('firstName', e.target.value);
                  }}
                  value={values.firstName}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  disabled={Id}
                  label="الاسم الثاني"
                  name="lastName"
                  required
                  variant="outlined"
                  value={values.lastName}
                  onChange={(e) => {
                    setFieldValue('lastName', e.target.value);
                  }}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  disabled={Id}
                  label="البريد الالكتروني"
                  name="email"
                  variant="outlined"
                  value={values.email}
                  onChange={(e) => {
                    setFieldValue('email', e.target.value);
                  }}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  disabled={Id}
                  label="رقم الهاتف"
                  name="phone"
                  required
                  type="number"
                  variant="outlined"
                  value={values.phone}
                  onChange={(e) => {
                    setFieldValue('phone', e.target.value);
                  }}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>

              <Grid item md={12} xs={12} style={{ height: 300 }}>
                <Typography style={{ margin: 8 }}>الموقع</Typography>
                {!Id ? (
                  <GetLocationMap
                    Lat={values.lat}
                    Lng={values.lng}
                    setLocation={handleChangeLocation}
                    Zoom={18}
                  />
                ) : (
                  <DisplayPoint Lat={values.lat} Lng={values.lng} />
                )}
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          {!Id && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                disabled={JSON.stringify(_user) === JSON.stringify(values)}
                style={{ margin: 8 }}
                type="submit"
                color="primary"
                variant="contained"
              >
                حفظ المعلومات
              </Button>
            </Box>
          )}
        </Card>
        <SnackBar message={Message} />
      </Form>
    </FormikProvider>
  );
};
