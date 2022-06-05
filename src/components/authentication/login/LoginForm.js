import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  FormControlLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------
import { AuthContext } from '../../../utils/ContextProvider';
import ApiRoot from '../../../Test/APiRoot';

export default function LoginForm() {
  const authContext = useContext(AuthContext);
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(' البريد الإلكتروني أو رقم الهاتف مطلوب'),
    password: Yup.string().required('كلمة المرور مطلوبة')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      SubmitForm(values);
    }
  });

  const SubmitForm = async (values) => {
    const { email, password } = values;

    const data = new FormData();
    data.append('Password', password);
    data.append('Email', email);

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };

    const url = `${ApiRoot}/Login/Login`;

    try {
      const response = await fetch(url, options);
      setSubmitting(false);
      if (response.ok && response.status === 200) {
        const result = await response.json();
        console.log('result ', result);
        if (result === 'تم حظر المستخدم') {
          setHelperText('تم حظر المستخدم, يرجى التواصل مع فرق الدعم الفني');
          setError(true);
        } else {
          const _user = { ...result.value.user, token: result.value.token };
          authContext.setUser(_user);
          return <Navigate to="/" />;
        }
      }
      setSubmitting(false);
      if (!error) setHelperText('عذرا حدث خطا ما!');
      setError(true);
      return <></>;
    } catch (error) {
      console.error(error);
    }
  };

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Avatar
            variant="square"
            imgProps={{
              style: { height: '100%', width: 'auto' }
            }}
            style={{ width: '100%', height: '300px' }}
            src="https://image.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg"
          />
          <TextField
            size="small"
            fullWidth
            autoComplete="email or phone number"
            type="email"
            inputProps={{
              autocomplete: 'new-email',
              form: {
                autocomplete: 'off'
              }
            }}
            label="البريد الإلكتروني أو رقم الهاتف"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            size="small"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label=" كلمة المرور"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="تذكرني"
          />

          {/* <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link> */}
        </Stack>
        <FormControl fullWidth error={error} variant="standard">
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            تسجيل الدخول
          </LoadingButton>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      </Form>
    </FormikProvider>
  );
}
