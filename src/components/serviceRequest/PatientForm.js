import * as Yup from 'yup';
import { forwardRef } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { Stack, TextField, Autocomplete } from '@mui/material';

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

  const RegisterSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, 'الاسم قصير جدا!')
      .max(50, 'الاسم طويل جدا!')
      .required('الاسم اجباري'),
    Age: Yup.number().required('العمر اجباري'),
    Sex: Yup.string().required('تحديد جنس المريض اجباري')
  });

  const formik = useFormik({
    initialValues: {
      Sex: '',
      Name: '',
      Age: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            size="small"
            label="اسم المريض"
            {...getFieldProps('Name')}
            error={Boolean(errors.Name)}
            helperText={errors.Name}
          />
          <TextField fullWidth multiline maxRows={4} size="small" label="وصف حالة المريض" />
          <TextField
            fullWidth
            size="small"
            label="العمر"
            InputProps={{
              inputComponent: NumberFormatCustom
            }}
            {...getFieldProps('Age')}
            error={Boolean(errors.Age)}
            helperText={errors.Age}
          />
          <Autocomplete
            id="size-small-outlined"
            size="small"
            options={[
              { title: 'ذكر', value: 1 },
              { title: 'انثى', value: 2 }
            ]}
            getOptionLabel={(option) => option.title}
            onChange={(e, value) => setFieldValue('Sex', value?.title || '')}
            renderInput={(params) => (
              <TextField
                {...getFieldProps('Sex')}
                error={Boolean(errors.Sex)}
                helperText={errors.Sex}
                {...params}
                label="جنس المريض"
              />
            )}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
}
