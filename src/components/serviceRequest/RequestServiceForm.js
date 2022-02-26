import * as React from 'react';
// material
import {
  Slide,
  Stack,
  TextField,
  Box,
  Autocomplete,
  Grid,
  FormGroup,
  Tooltip,
  Checkbox,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';

// ----------------------------------------------------------------------
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ApiRoot from '../../Test/APiRoot';
import { AuthContext } from '../../utils/ContextProvider';
import { GetLocationMap } from '../../utils/Maps';

export default function RequestServiceForm({ formik }) {
  React.useEffect(async () => {
    console.log('formik  ', formik.values);
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      }
    };

    const url = `${ApiRoot}/Service/GetServicesType`;
    try {
      const response = await fetch(url, options);
      if (response.ok && response.status === 200) {
        const result = await response.json();
        setServices([...result.services]);
      }
    } catch (ex) {
      alert(ex);
    }
  }, [0]);

  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const [valueDate, setvalueDate] = React.useState(new Date(Date.now() + 12 * 3600 * 1000));
  const [services, setServices] = React.useState([]);
  const handleChangeTime = (newValue) => {
    setvalueDate(newValue);
  };

  const handleChangeLocation = (lat, lng) => {
    setFieldValue('Lng', lat);
    setFieldValue('Lat', lng);
  };

  const { errors, setFieldValue, getFieldProps, values } = formik;

  return (
    <Stack spacing={3}>
      <Autocomplete
        id="size-small-outlined"
        onChange={(e, value) => setFieldValue('SeviceTypeId', value?.title || '')}
        size="small"
        options={[...services]}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...getFieldProps('SeviceTypeId')}
            error={Boolean(errors.SeviceTypeId)}
            helperText={errors.SeviceTypeId}
            {...params}
            label="نوع الخدمة المطلوبة"
          />
        )}
      />
      <TextField
        fullWidth
        size="small"
        autoComplete="username"
        type="text"
        multiline={Boolean(true)}
        maxRows={5}
        onChange={(e) => setFieldValue('description', e.target.value)}
        value={values.description}
        label="اضافة وصف"
        {...getFieldProps('description')}
        error={Boolean(errors.description)}
        helperText={errors.description}
      />
      <Grid item md={12} xs={12}>
        {!values.UserLocation && (
          <Box style={{ height: '300px' }}>
            <GetLocationMap setLocation={handleChangeLocation} />
            {Boolean(errors.Lat) && (
              <FormHelperText style={{ color: 'red' }}>{errors.Lat}</FormHelperText>
            )}
          </Box>
        )}
        <FormGroup>
          <FormControlLabel
            {...getFieldProps('UserLocation')}
            error={Boolean(errors?.UserLocation)}
            helperText={errors?.UserLocation}
            control={<Checkbox defaultChecked />}
            label="Use Current Acount Location"
          />
        </FormGroup>
      </Grid>
      <Tooltip
        title="يجب ان لا يقل الوقت 12 ساعة من الوقت الحالي"
        enterTouchDelay={0}
        placement="bottom"
      >
        <Box style={{ marginTop: '65px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              fullWidth
              size="small"
              label="اقصى مدة زمنية يمكن للخدمة الوصول فيها "
              value={valueDate}
              onChange={handleChangeTime}
              minDateTime={new Date(Date.now() + 11 * 3600 * 1000)}
              renderInput={(params) => <TextField fullWidth size="small" {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Tooltip>
    </Stack>
  );
}
