import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
// material
import {
  Stack,
  TextField,
  FormGroup,
  FormControl,
  Typography,
  Container,
  FormHelperText
} from '@mui/material';
import ApiRoot from '../Test/APiRoot';
import Page from '../components/Page';
import Mune from '../components/authentication/register/AddServiceMenu';
import { AuthContext } from '../utils/ContextProvider';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

//  -----------------------------------------------------------------

export default function AddServiceType() {
  useEffect(async () => {
    const Url = new window.URL(window.location.href);
    const id = Url.searchParams.get('id');
    setId(id);
    const url = `${ApiRoot}/Service/GetServiceType?id=${id}`;
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
        setFieldValue('title', result.title);
        setGender(result.category);
      }
    } catch (e) {
      console.log(e);
    }
  }, [0]);

  const [error, setError] = useState(false);
  const [Gender, setGender] = useState(0);
  const [GenderError, setGenderError] = useState(false);
  const [helperText, setHelperText] = useState();
  const [id, setId] = useState(0);
  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('اسم الفئة مطلوب')
  });

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      SubmitForm(values);
    }
  });

  const SubmitForm = async (values) => {
    const { title } = values;
    const data = new FormData();
    data.append('title', title);
    data.append('category', Gender);
    data.append('id', id);

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      },
      body: data
    };

    const url = `${ApiRoot}/Service/SaveType`;

    try {
      const response = await fetch(url, options);
      if (response.ok && response.status === 200) {
        setHelperText('تم الحفظ');
      } else {
        setHelperText('حدث خظا ما');
      }
      setSubmitting(false);
    } catch (error) {
      setHelperText('حدث خظا ما');
      setSubmitting(false);
    }
    setTimeout(() => {
      setHelperText('');
    }, 2000);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
    setGenderError(e.target.value === 0);
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
    <Page title="اضافة فئة خدمية | أقربون">
      <Container style={{ marginTop: 35 }}>
        <Typography variant="h6" style={{ padding: 10 }}>
          اضافة فئة خدمية جديدة :
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="اسم الفئة"
                {...getFieldProps('title')}
                size="small"
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />

              <Mune
                selection={Gender}
                style={{
                  border: GenderError ? '1px solid red' : '',
                  borderRadius: 10
                }}
                options={[
                  { label: ' خدمة تحتاج شهادة مزاولة', value: '3' },
                  { label: ' خدمة لا تحتاج شهادة مزاولة', value: '1' },
                  { label: 'ملحقات', value: '2' }
                ]}
                onSort={onChangeGender}
              />
              {!!GenderError && (
                <FormGroup>
                  <FormHelperText style={{ color: 'red', marginTop: 1 }}>
                    التصنيف مطلوب
                  </FormHelperText>
                </FormGroup>
              )}

              <FormControl fullWidth error={error} variant="standard">
                <LoadingButton
                  fullWidth
                  style={{ width: 195 }}
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  onClick={() => {
                    setGenderError(Gender === 0);
                  }}
                >
                  حفظ
                </LoadingButton>
                <FormHelperText>{helperText}</FormHelperText>
              </FormControl>
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
