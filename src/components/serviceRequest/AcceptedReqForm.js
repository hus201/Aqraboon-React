import { useState, useEffect } from 'react';
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
import { DisplayPoint } from '../../utils/Maps';

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

export default function AcceptedReqForm({ request, rate }) {
  useEffect(() => {
    setRate(rate);
    setService({
      service: request?.seviceType?.title,
      desc: request.description,
      lat: request.lattiud,
      lng: request.longtiud,
      date: new Date(request.expireTime).toLocaleString()
    });
  }, [request]);

  const [Service, setService] = useState({
    service: request?.seviceType?.title,
    desc: request.description,
    date: new Date(request.expireTime).toLocaleString()
  });
  const [Rate, setRate] = useState(0);

  return (
    <div>
      <Stack spacing={3}>
        <TextField
          InputLabelProps={{ shrink: 1 }}
          fullWidth
          disabled
          size="small"
          label="Sevice"
          value={Service.service}
        />
        <TextField
          fullWidth
          disabled
          InputLabelProps={{ shrink: 1 }}
          size="small"
          multiline={Boolean(true)}
          maxRows={5}
          label="description"
          value={Service.desc}
        />
        <Box style={{ height: '300px' }}>
          {Service?.lat && <DisplayPoint Lat={Service?.lat} Lng={Service?.lng} />}
        </Box>
        <TextField fullWidth disabled size="small" label="الوقت المطلوب" value={Service.date} />
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          {Boolean(Rate) && (
            <>
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
                  defaultValue={Rate}
                  readOnly
                  IconContainerComponent={IconContainer}
                  highlightSelectedOnly
                />
              </Box>
            </>
          )}
        </Box>
      </Stack>
    </div>
  );
}
