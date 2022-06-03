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
import ImageViewer from 'react-simple-image-viewer';
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

export default function ApproveService() {
  const [trigger, setTrigger] = React.useState(0);

  React.useEffect(async () => {
    const url = `${ApiRoot}/Service/GetUnApprovalService`;
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
  }, [trigger]);

  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const [Requestlist, setRequestlist] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [RequestId, setRequestId] = React.useState(0);
  const [Report, setReport] = React.useState('');
  const [Message, setMessage] = React.useState('');
  const [isViewerOpen, setIsViewerOpen] = React.useState(0);
  const images = [
    'http://placeimg.com/1200/800/nature',
    'http://placeimg.com/800/1200/nature',
    'http://placeimg.com/1920/1080/nature',
    'http://placeimg.com/1500/500/nature'
  ];

  const handleClickOpen = (id) => {
    setRequestId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ApproveService = async (id) => {
    const data = new FormData();
    data.append('id', id);

    const url = `${ApiRoot}/Service/ApproveService`;
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
        setRequestlist([...removeArrayObj(id)]);
      } else {
        setMessage('فشل حفظ المعلومات ');
      }
    } catch (error) {
      console.error(error);
    }

    setTrigger(trigger + 1);
  };

  const DeleteService = async (id) => {
    const data = new FormData();
    data.append('id', id);

    const url = `${ApiRoot}/Service/DeleteService`;
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
        setRequestlist([...removeArrayObj(id)]);
      } else {
        setMessage('فشل حفظ المعلومات ');
      }
    } catch (error) {
      console.error(error);
    }
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
        UpdateUser(authContext);
      } else {
        setMessage('فشل حفظ المعلومات ');
      }
    } catch (error) {
      console.error(error);
    }
    setTrigger(trigger + 1);
    handleClose();
  };
  const removeArrayObj = (id, arr = [...Requestlist]) => {
    const newArray = [...arr.filter((x) => x.id !== id)];
    return newArray;
  };
  return (
    <RootStyle title=" طلب تقديم خدمة | أقربون">
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              طلب تقديم خدمة
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
                          <div>
                            <Button href={`/User/Profile?id=${item.userId}`} color="info">
                              {item?.user?.name}
                            </Button>
                            {item?.attachments && (
                              <Button
                                onClick={async () => {
                                  setIsViewerOpen(item.id);
                                }}
                                color="success"
                              >
                                عرض الوثائق
                              </Button>
                            )}
                            <Button
                              onClick={async () => {
                                await ApproveService(item.id);
                              }}
                              color="success"
                            >
                              موافقة
                            </Button>

                            <Button
                              onClick={() => {
                                DeleteService(item.id);
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
                            primary={item.service_type.title}
                            secondary={
                              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item.service_type.desciption}
                                </Typography>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {`${item.ageFrom !== -1 ? item.ageFrom : ''} - ${
                                    item.ageTo !== -1 ? item.ageTo : 'كل الاعمار'
                                  }`}
                                </Typography>
                              </div>
                            }
                          />
                        </ListItemButton>
                      </ListItem>

                      {isViewerOpen === item.id && (
                        <ImageViewer
                          src={[
                            ...item?.attachments?.map(
                              (x) =>
                                `${ApiRoot.replace('api', '')}Contents/Service/Attachment/${
                                  item.id
                                }/${x?.attachment}`
                            )
                          ]}
                          currentIndex={0}
                          onClose={() => {
                            setIsViewerOpen(0);
                          }}
                          disableScroll={false}
                          backgroundStyle={{
                            backgroundColor: 'rgba(0,0,0,0.9)'
                          }}
                          closeOnClickOutside={Boolean(true)}
                        />
                      )}
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
