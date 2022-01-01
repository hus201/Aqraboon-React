import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Autocomplete } from '@mui/material';

export default function VolunteerForm() {
  const navigate = useNavigate();
  const options = [
    { title: 'كلاهما', value: 0 },
    { title: 'ذكر', value: 1 },
    { title: 'انثى', value: 2 }
  ];
  const [VolunteerSex, setVolunteerSex] = useState(options[0]);
  const formik = useFormik({
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate style={{ minWidth: '500px' }} onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Autocomplete
            id="size-small-outlined"
            size="small"
            options={options}
            value={VolunteerSex}
            onChange={(e, NewVal) => {
              setVolunteerSex(NewVal);
            }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="جنس مقدم الخدمة" />}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
}
