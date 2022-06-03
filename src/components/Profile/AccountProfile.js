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
import SnackBar from '../SnackBar';
import { AuthContext } from '../../utils/ContextProvider';

export const AccountProfile = (props) => {
  React.useEffect(async () => {
    const Url = new window.URL(window.location.href);
    const id = Url.searchParams.get('id');
    setId(id);
    if (id) {
      const url = `${ApiRoot}/User/GetMember?id=${id}`;
      const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${User.token}`
        }
      };
      try {
        const response = await fetch(url, options);
        if (response.ok && response.status === 200) {
          const result = await response.json();
          setName(result.name);
          //   setBLocked(result.role === 'Block');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [0]);

  const [trigger, setTrigger] = React.useState(1);
  const [Name, setName] = React.useState('');
  const [BLocked, setBLocked] = React.useState(false);
  const [Id, setId] = React.useState(0);
  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const ImageRef = React.useRef();
  const [Message, setMessage] = React.useState('');
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
  const blockUser = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${User.token}`
      }
    };

    const data = new FormData();
    data.append('Id', Id);

    axios
      .post(`${ApiRoot}/User/BlockUser`, data, config)
      .then((res) => {
        if (BLocked) {
          setMessage('تم الغاء حظر المستخدم');
        } else {
          setMessage('تم حظر المستخدم');
        }
        setBLocked(!BLocked);
      })
      .catch((err) => {
        setMessage('لم يتم الحفظ');
      });
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
            src={`${ApiRoot.replace('api', '')}Contents/User/${
              Id ?? User.id
            }.jpg?trigger=${trigger}`}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {Id ? Name : User?.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {Id && User.role === 'Admin' && User.id !== Id && (
          <Button
            color={BLocked ? 'primary' : 'error'}
            fullWidth
            variant="text"
            onClick={blockUser}
          >
            {BLocked ? 'الغاء الحظر' : 'حظر'}
          </Button>
        )}
        {!Id && (
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
        )}
      </CardActions>
      <SnackBar message={Message} />
    </Card>
  );
};
