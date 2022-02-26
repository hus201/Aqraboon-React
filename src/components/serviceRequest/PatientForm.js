import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import {
  Stack,
  TextField,
  Autocomplete,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@mui/material';

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

export default function PatientForm({ formik }) {
  const { errors, setFieldValue, getFieldProps } = formik;
  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  return (
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

      <FormGroup>
        <FormControlLabel
          {...getFieldProps('UserLocation')}
          error={Boolean(errors?.UserLocation)}
          helperText={errors?.UserLocation}
          control={<Checkbox defaultChecked />}
          label="Use Current Acount info"
        />
      </FormGroup>
    </Stack>
  );
}
