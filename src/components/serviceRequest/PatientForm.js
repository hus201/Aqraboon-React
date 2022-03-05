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

export default function PatientForm({ User, errors, values, setObjValues }) {
  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };
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
        helperText={errors?.ms?.Name}
      />

      <TextField
        fullWidth
        multiline
        value={values?.Pdescription}
        onChange={(e) => setObjValues('Pdescription', e.target.value)}
        error={Boolean(errors?.Pdescription)}
        helperText={errors?.ms?.Pdescription}
        maxRows={4}
        size="small"
        label="وصف حالة المريض"
      />

      <TextField
        fullWidth
        disabled={values?.CurrentInfo}
        size="small"
        label="العمر"
        value={
          values?.CurrentInfo
            ? new Date(User.birthDate).getFullYear() - new Date().getFullYear()
            : values?.Age
        }
        onChange={(e) => setObjValues('Age', e.target.value + 0)}
        // InputProps={{
        //   inputComponent: NumberFormatCustom
        // }}
        type="number"
        error={Boolean(errors?.Age)}
        helperText={errors?.ms?.Age}
      />

      <Autocomplete
        id="size-small-outlined"
        size="small"
        disabled={values?.CurrentInfo}
        value={values?.CurrentInfo ? Genders[User.gender] : Genders[values?.Sex || 1]}
        options={[...Genders]}
        getOptionLabel={(option) => option.title}
        onChange={(e, value) => setObjValues('Sex', value?.value || '')}
        renderInput={(params) => (
          <TextField
            error={Boolean(errors?.Sex)}
            disabled={values?.CurrentInfo}
            helperText={errors?.ms?.Sex}
            {...params}
            label="جنس المريض"
          />
        )}
      />

      <FormGroup>
        <FormControlLabel
          onChange={(e) => setObjValues('CurrentInfo', !values?.CurrentInfo)}
          error={Boolean(errors?.CurrentInfo)}
          helperText={errors?.ms?.CurrentInfo}
          control={<Checkbox checked={values?.CurrentInfo} />}
          label="Use Current Acount info"
        />
      </FormGroup>
    </Stack>
  );
}
