import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
// material
import { Stack, TextField, Box } from '@mui/material';
import { LoadingButton, DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// ----------------------------------------------------------------------

export default function AcceptedReqForm() {
  const [Service, setService] = useState({
    service: 'ابرة عضل ',
    desc: 'هذا بعض الوصف حول ما اريده ضمن الخدمة التي طلبتها',
    location: {
      lat: 25.3,
      lng: 21.3
    },
    date: new Date().toLocaleString()
  });
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
    <div>
      <Stack spacing={3}>
        <TextField fullWidth disabled size="small" label="Sevice" value={Service.service} />

        <TextField
          fullWidth
          disabled
          size="small"
          multiline={Boolean(true)}
          maxRows={5}
          label="Sevice"
          value={Service.desc}
        />

        <Box style={{ height: '300px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyC4EGFc_Y4wOspdDUmgEUu_76dBP2v6RD4' }}
            defaultCenter={{
              lat: Service.location.lat,
              lng: Service.location.lng
            }}
            defaultZoom={4}
            yesIWantToUseGoogleMapApiInternals
          >
            <AnyReactComponent text="My Marker" />
          </GoogleMapReact>
        </Box>

        <TextField fullWidth disabled size="small" label="الوقت المطلوب" value={Service.date} />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={Boolean(false)}
      >
        موافقة
      </LoadingButton>
    </div>
  );
}
