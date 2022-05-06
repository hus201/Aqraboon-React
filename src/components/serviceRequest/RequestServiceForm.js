import * as React from 'react';
// material
import {
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

export default function RequestServiceForm({ errors, values, setObjValues, handleChangeLocation }) {
  React.useEffect(async () => {
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
  const [services, setServices] = React.useState([]);
  const handleChangeTime = (newValue) => {
    setObjValues('ExpTime', newValue);
  };

  return (
    <Stack spacing={3}>
      <Autocomplete
        id="size-small-outlined"
        onChange={(e, value) => setObjValues('SeviceTypeId', value?.id || '')}
        size="small"
        value={{
          ...services.filter((x) => x.id === values.SeviceTypeId)[0]
        }}
        options={[...services]}
        getOptionLabel={(option) => option?.title || ''}
        renderInput={(params) => (
          <TextField
            error={Boolean(errors?.SeviceTypeId)}
            helperText={errors?.SeviceTypeId ? errors?.ms?.SeviceTypeId : ''}
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
        onChange={(e) => setObjValues('description', e.target.value)}
        value={values?.description}
        label="اضافة وصف"
        error={Boolean(errors?.description)}
        helperText={errors?.description ? errors?.ms?.description : ''}
      />
      <Grid item md={12} xs={12}>
        {!values?.UserLocation && (
          <Box style={{ height: '300px' }}>
            <GetLocationMap setLocation={handleChangeLocation} />
          </Box>
        )}
        <FormGroup>
          <FormControlLabel
            onChange={() => {
              setObjValues('UserLocation', !values?.UserLocation);
            }}
            error={Boolean(errors?.UserLocation)}
            helperText={errors?.ms?.UserLocation}
            control={<Checkbox />}
            label="استخدم موقع الحساب الحالي"
          />
          {Boolean(errors?.Loc) && (
            <FormHelperText style={{ color: 'red' }}>{errors?.ms?.Loc}</FormHelperText>
          )}
        </FormGroup>
      </Grid>
      <Tooltip
        title="يجب ان لا يقل الوقت 12 ساعة من الوقت الحالي"
        enterTouchDelay={0}
        placement="bottom"
      >
        <Box style={{ marginTop: '12px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              fullWidth
              size="small"
              label="اقصى مدة زمنية يمكن للخدمة الوصول فيها "
              value={values?.ExpTime || new Date(Date.now() + 11 * 3600 * 1000)}
              onChange={handleChangeTime}
              minDate={new Date(Date.now() + 11 * 3600 * 1000)}
              maxDate={new Date(Date.now() + 11 * 3600 * 1000 * 5)}
              renderInput={(params) => <TextField fullWidth size="small" {...params} />}
            />
          </LocalizationProvider>
          {Boolean(errors?.ExpTime) && (
            <FormHelperText style={{ color: 'red' }}>{errors?.ms?.ExpTime}</FormHelperText>
          )}
        </Box>
      </Tooltip>
    </Stack>
  );
}
