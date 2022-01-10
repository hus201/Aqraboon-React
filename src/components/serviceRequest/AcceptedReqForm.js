import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
// material

import { Stack, TextField, Box, Rating } from '@mui/material';
import { LoadingButton, DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied'
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied'
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral'
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied'
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied'
  }
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

// ------------------------------- ---------------------------------------

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
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          <Box sx={{ ml: 2 }}>تقييم طالب الخدمة</Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly'
            }}
          >
            <Box sx={{ ml: 2 }}>(5) </Box>
            <Rating
              name="highlight-selected-only"
              defaultValue={2}
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
            />
          </Box>
        </Box>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={Boolean(false)}
        >
          موافقة
        </LoadingButton>{' '}
      </Stack>
    </div>
  );
}
