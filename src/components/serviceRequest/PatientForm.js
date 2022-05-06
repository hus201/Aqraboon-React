import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  TextField,
  Autocomplete,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@mui/material';

export default function PatientForm({ User, errors, values, setObjValues }) {
  const Genders = [
    { title: 'ذكر', value: 1 },
    { title: 'انثى', value: 2 }
  ];

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        disabled={values?.CurrentInfo}
        InputLabelProps={{ shrink: values?.CurrentInfo || values?.Name }}
        size="small"
        label="اسم المريض"
        value={values?.CurrentInfo ? User.name : values?.Name}
        onChange={(e) => setObjValues('Name', e.target.value)}
        error={Boolean(errors?.Name)}
        helperText={errors?.Name ? errors?.ms?.Name : ''}
      />

      <TextField
        fullWidth
        multiline
        value={values?.Pdescription}
        onChange={(e) => setObjValues('Pdescription', e.target.value)}
        error={Boolean(errors?.Pdescription)}
        helperText={errors?.Pdescription ? errors?.ms?.Pdescription : ''}
        maxRows={4}
        size="small"
        label="وصف حالة المريض"
      />

      <TextField
        fullWidth
        disabled={values?.CurrentInfo}
        size="small"
        label="العمر"
        InputLabelProps={{ shrink: values?.CurrentInfo || values?.Age || values?.Age === 0 }}
        value={
          values?.CurrentInfo
            ? new Date().getFullYear() - new Date(User.birthDate).getFullYear()
            : values?.Age
        }
        onChange={(e) => setObjValues('Age', e.target.valueAsNumber)}
        type="number"
        error={Boolean(errors?.Age)}
        helperText={errors?.Age ? errors?.ms?.Age : ''}
      />

      <Autocomplete
        id="size-small-outlined"
        size="small"
        disabled={values?.CurrentInfo}
        value={
          values?.CurrentInfo ? { ...Genders[User.gender - 1] } : { ...Genders[values?.Sex - 1] }
        }
        options={[...Genders]}
        getOptionLabel={(option) => option?.title || ''}
        onChange={(e, value) => setObjValues('Sex', value?.value || '')}
        renderInput={(params) => (
          <TextField
            error={Boolean(errors?.Sex)}
            disabled={values?.CurrentInfo}
            helperText={errors?.Sex ? errors?.ms?.Sex : ''}
            {...params}
            label="جنس المريض"
          />
        )}
      />

      <FormGroup>
        <FormControlLabel
          onChange={(e) => {
            setObjValues('CurrentInfo', !values?.CurrentInfo);
          }}
          error={Boolean(errors?.CurrentInfo)}
          helperText={errors?.ms?.CurrentInfo}
          control={<Checkbox checked={values?.CurrentInfo} />}
          label="استخدم معلومات الحساب الحالي"
        />
      </FormGroup>
    </Stack>
  );
}
