import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import axios from 'axios';
import ApiRoot from '../../Test/APiRoot';
import { AuthContext } from '../../utils/ContextProvider';

export const AccountProfile = (props) => {
  const [trigger, setTrigger] = React.useState(1);
  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const ImageRef = React.useRef();

  const UpdaetImaegs = (file) => {
    const config = {
      headers: {
        Authorization: `Bearer ${User.token}`
      }
    };
    const data = new FormData();
    data.append('battlePlans', file, file.name);
    axios
      .post(`${ApiRoot}/User/SaveImage`, data, config)
      .then((res) => {
        setTrigger(trigger + 1);
      })
      .catch((err) => {});
  };

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={`${ApiRoot.replace('api', '')}Contents/User/${User.id}.jpg?trigger=${trigger}`}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {User?.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={() => {
            ImageRef.current.click();
          }}
        >
          <input
            type="file"
            style={{ display: 'none' }}
            id="myFile"
            onChange={(e) => {
              UpdaetImaegs(e.target.files[0]);
            }}
            name="filename"
            accept="image/png, image/jpeg"
            ref={ImageRef}
          />
          تغيير الصورة الشخصية
        </Button>
      </CardActions>
    </Card>
  );
};
