import * as React from 'react';
// material
import { styled, useTheme } from '@mui/material/styles';
import {
  Button,
  Stack,
  Box,
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  useMediaQuery,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
// layouts
// components
import Page from '../components/Page';
import SnackBar from '../components/SnackBar';
import ApiRoot from '../Test/APiRoot';
import { AuthContext } from '../utils/ContextProvider';
// ------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    paddingTop: 0
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(2)
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2, 0)
}));

// ----------------------------------------------------------------------

export default function NeedRequestsList() {
  const [trigger, setTrigger] = React.useState(0);

  React.useEffect(async () => {
    const url = `${ApiRoot}/User/GetBlocedkUsers`;
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      }
    };
    const response = await fetch(url, options);
    if (response.ok && response.status === 200) {
      const result = await response.json();
      setUsers([...result]);
    }
  }, [trigger]);

  const [Requestlist, setRequestlist] = React.useState([]);
  const [Ratings, setRatings] = React.useState([]);
  const authContext = React.useContext(AuthContext);
  const [AcceptedRequests, setAcceptedRequests] = React.useState([]);
  const User = authContext.getUser();
  const [RequestId, setRequestId] = React.useState(0);
  const [users, setUsers] = React.useState(0);
  const [Message, setMessage] = React.useState('');

  const blockUser = (id, isBLocked) => {
    const config = {
      headers: {
        Authorization: `Bearer ${User.token}`
      }
    };

    const data = new FormData();
    data.append('Id', id);

    axios
      .post(`${ApiRoot}/User/BlockUser`, data, config)
      .then((res) => {
        if (isBLocked) {
          setMessage('تم الغاء حظر المستخدم');
        } else {
          setMessage('تم حظر المستخدم');
        }

        const _users = [
          ...users.map((x) => {
            if (x.id === id) {
              if (x.role === 'User') x.role = 'BLock';
              else x.role = 'User';
            }
            return x;
          })
        ];
        console.log('_users', _users);
        setUsers([..._users]);
      })
      .catch((err) => {
        setMessage('لم يتم الحفظ');
      });
  };

  return (
    <RootStyle title="Accepted reques list">
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              المستخدمين المحظورين
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>تفاصيل الطلب </Typography> */}
          </Stack>

          <Box sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {users.length > 0 &&
                  users.map((item, index) => (
                    <>
                      <ListItem
                        secondaryAction={
                          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                            <Button href={`/User/Profile?id=${item.id}`} color="inherit">
                              عرض الملف الشخصي
                            </Button>
                            {item.role === 'User' ? (
                              <Button
                                onClick={() => {
                                  blockUser(item.id, item.role === 'Block');
                                }}
                                color="error"
                              >
                                حظر
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  blockUser(item.id, item.role === 'Block');
                                }}
                                color="success"
                              >
                                الفاء الحظر
                              </Button>
                            )}
                          </div>
                        }
                        alignItems="flex-start"
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              alt="Remy Sharp"
                              src={`${ApiRoot.replace(/api$/, '')}Contents/User/${item.id}.jpg`}
                            >
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.name}
                            secondary={
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: '10%'
                                }}
                              >
                                <div>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {`${item.phone} `}
                                    {item.email && ` -  ${item.email}`}
                                    {item.gender === 1 ? '  -  ذكر' : '  -  انثى'}
                                  </Typography>
                                </div>
                              </div>
                            }
                          />
                        </ListItemButton>
                      </ListItem>

                      <Divider variant="inset" component="li" />
                    </>
                  ))}
              </List>
            </Stack>
          </Box>
        </ContentStyle>
      </Container>
      <SnackBar message={Message} />
    </RootStyle>
  );
}
