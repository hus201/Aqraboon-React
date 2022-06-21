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
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery
} from '@mui/material';
import Page from '../components/Page';
import SnackBar from '../components/SnackBar';
import ApiRoot from '../Test/APiRoot';
import { AuthContext } from '../utils/ContextProvider';
import { UpdateUser } from '../utils/UpdateUserInfo';

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

export default function Reports() {
  React.useEffect(async () => {
    const url = `${ApiRoot}/Service/GetReports`;
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
      setRequestlist([...result]);
    }
  }, [0]);

  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const [Requestlist, setRequestlist] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [RequestId, setRequestId] = React.useState(0);
  const [Report, setReport] = React.useState('');
  const [Message, setMessage] = React.useState('');

  const handleClickOpen = (id) => {
    setRequestId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveService = async () => {
    const data = new FormData();
    data.append('id', RequestId);

    const url = `${ApiRoot}/Service/RemoveService`;
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      },
      body: data
    };

    try {
      const response = await fetch(url, options);
      if (response.ok && response.status === 200) {
        setMessage('تم حفظ المعلومات بنجاح');
        setRequestlist([...removeArrayObj(RequestId)]);
        await UpdateUser(authContext);
      } else {
        setMessage('فشل حفظ المعلومات ');
      }
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };
  const removeArrayObj = (id, arr = [...Requestlist]) => {
    const newArray = [...arr.filter((x) => x.id !== id)];
    return newArray;
  };
  return (
    <RootStyle title=" الشكاوي | أقربون">
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              التقارير و الشكاوي
            </Typography>
          </Stack>

          <Box sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {Requestlist.length > 0 &&
                  Requestlist.map((item, index) => (
                    <>
                      <ListItem
                        secondaryAction={
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 8
                            }}
                          >
                            {item.serviceId && (
                              <>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8
                                  }}
                                >
                                  <Typography />
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8
                                  }}
                                >
                                  <Typography> المشتكى عليه :</Typography>
                                  <Button
                                    href={`/User/Profile?id=${item.user_reported.id}`}
                                    color="info"
                                  >
                                    {item.user_reported.name}
                                  </Button>
                                </div>
                              </>
                            )}
                            {item.requestId && (
                              <>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8
                                  }}
                                >
                                  <Button
                                    href={`/Service/AcceptedRequest?id=${item.requestId}`}
                                    color="info"
                                  >
                                    <Typography> الطلب </Typography>
                                  </Button>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8
                                  }}
                                >
                                  <Typography> المشتكى عليه :</Typography>
                                  <Button
                                    href={`/User/Profile?id=${item.user_reported.id}`}
                                    color="info"
                                  >
                                    {item.user_reported.name}
                                  </Button>
                                </div>
                              </>
                            )}
                            <Button
                              style={{ display: 'none' }}
                              onClick={() => {
                                handleClickOpen(item.id);
                              }}
                              color="error"
                            >
                              حذف
                            </Button>
                          </div>
                        }
                        alignItems="flex-start"
                      >
                        <ListItemButton>
                          <ListItemText
                            primary={item.description}
                            secondary={
                              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <Typography
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                  }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  مقدم الشكوى : {item.type === 1 ? 'طالب خدمة' : 'مفدم خدمة'}
                                  <Button href={`/User/Profile?id=${item._user.id}`} color="info">
                                    {item._user.name}
                                  </Button>
                                </Typography>
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

          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">هل انت متاكد من الحذف</DialogTitle>
            <DialogActions style={{ width: 350 }}>
              <Button color="error" autoFocus onClick={handleClose}>
                الغاء
              </Button>
              <Button
                color="success"
                onClick={async () => {
                  await handleRemoveService();
                }}
              >
                حذف
              </Button>
            </DialogActions>
          </Dialog>
        </ContentStyle>
      </Container>
      <SnackBar message={Message} />
    </RootStyle>
  );
}
