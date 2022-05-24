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
  IconButton,
  Tabs,
  Tab,
  TextField,
  DialogContentText,
  Rating,
  useMediaQuery,
  Avatar
} from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import PersonIcon from '@mui/icons-material/Person';
// layouts
// components
import Page from '../components/Page';
import ApiRoot from '../Test/APiRoot';
import SnackBar from '../components/SnackBar';
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

export default function AcceptedList() {
  const [trigger, setTrigger] = React.useState(0);

  React.useEffect(async () => {
    const url = `${ApiRoot}/Service/GetVolunteerRequests`;
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
      setRequestlist([...result.value.requests]);
      setAcceptedRequests([...result.value.acceptedRequests]);
      setRatings([...result.value.rating]);
    }
  }, [trigger]);
  React.useEffect(async () => {
    if (User?.id) {
      const url = `${ApiRoot}/Service/GetVolunteerRequest`;
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
          console.log('ScopeRequests ', result);
          setScopeRequests([...result.value.inScopeRequests]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [trigger]);

  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();
  const [id, setId] = React.useState(0);
  const [Requestlist, setRequestlist] = React.useState([]);
  const [AcceptedRequests, setAcceptedRequests] = React.useState([]);
  const [Ratings, setRatings] = React.useState([]);
  const [ScopeRequests, setScopeRequests] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [openDel, setopenDel] = React.useState(false);
  const [RequestId, setRequestId] = React.useState(0);
  const [Reason, setReason] = React.useState('');
  const [Evaluation, setEvaluation] = React.useState('');
  const [value, setValue] = React.useState('1');
  const [rateValue, setRateValue] = React.useState(5);
  const [Message, setMessage] = React.useState('');

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = (id) => {
    setRequestId(id);
    setOpen(true);
  };
  const handleClickOpenDel = (id) => {
    setRequestId(id);
    setopenDel(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDel = () => {
    setopenDel(false);
  };
  const handleFailedrequest = async () => {
    const data = new FormData();
    data.append('Reason', Reason);
    data.append('RequestId', RequestId);

    const url = `${ApiRoot}/Service/FailedRequest`;
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
        setRequestlist([...updateArray(RequestId, 2)]);
        setTrigger(trigger + 1);
      } else {
        setMessage('فشل حفظ المعلومات');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeliveredRequest = async () => {
    const data = new FormData();
    data.append('Evaluation', Evaluation);
    data.append('Rate', rateValue);
    data.append('RequestId', RequestId);

    const url = `${ApiRoot}/Service/DeliveredRequest`;
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
        setRequestlist([...updateArray(RequestId, 3)]);
        setTrigger(trigger + 1);
      } else {
        setMessage('فشل حفظ المعلومات ');
      }
    } catch (error) {
      console.error(error);
    }
    handleCloseDel();
  };
  const hadleAcceptService = async (id) => {
    const url = `${ApiRoot}/Service/AcceptRequest`;

    const data = new FormData();
    data.append('Id', id);

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

    const response = await fetch(url, options);
    if (response.ok && response.status === 200) {
      setMessage('تم حفظ المعلومات بنجاح');
      setScopeRequests([...updateArray(id, 1, ScopeRequests)]);
      setTrigger(trigger + 1);
    } else {
      setMessage('فشل حفظ المعلومات ');
    }
  };
  const updateArray = (id, val, arr = [...Requestlist], name = 'status') => {
    const index = arr.findIndex((x) => x.id === id);
    const newArray = [...arr];
    if (index !== -1) {
      newArray[index][name] = val;
      console.log('index ', index);
    }
    console.log('newArray', newArray);
    return newArray;
  };
  return (
    <RootStyle title="Accepted reques list">
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              الطلبات
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>تفاصيل الطلبات </Typography>
          </Stack>

          <Box sx={{ width: '100%' }}>
            <TabContext value={value}>
              <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                <Tab label="الطلبات المقبولة" value="1" />
                <Tab label="الطلبات الغير مقبولة" value="2" />
              </TabList>
              <TabPanel value="1">
                <Stack spacing={3}>
                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {AcceptedRequests.length > 0 &&
                      AcceptedRequests.map((item, index) => (
                        <>
                          <ListItem
                            secondaryAction={
                              <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                {Requestlist[index].status === 1 && (
                                  <Button
                                    onClick={() => {
                                      handleClickOpenDel(Requestlist[index].id);
                                    }}
                                    color="success"
                                  >
                                    تم التسليم
                                  </Button>
                                )}

                                {Requestlist[index].status === 1 && (
                                  <Button
                                    onClick={() => {
                                      handleClickOpen(Requestlist[index].id);
                                    }}
                                    color="error"
                                  >
                                    رفض
                                  </Button>
                                )}
                                {Requestlist[index].status === 3 && (
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    تم التسليم
                                  </Typography>
                                )}
                                {Requestlist[index].status === 3 && (
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {Ratings.filter(
                                      (x) => x?.requestId === Requestlist[index].id
                                    )[0]?.value > 0 ? (
                                      <Rating
                                        name="half-rating"
                                        defaultValue={
                                          Ratings.filter(
                                            (x) => x.requestId === Requestlist[index].id
                                          )[0].value
                                        }
                                        readOnly
                                        precision={0.5}
                                      />
                                    ) : (
                                      <Button
                                        onClick={() => {
                                          handleClickOpenDel(Requestlist[index].id);
                                        }}
                                      >
                                        قيم طالب الخدمة
                                      </Button>
                                    )}
                                  </Typography>
                                )}
                              </div>
                            }
                            alignItems="flex-start"
                          >
                            <ListItemButton
                              onClick={() => {
                                window.location.href = `/Service/AcceptedRequest?id=${Requestlist[index].id}`;
                              }}
                            >
                              <ListItemAvatar>
                                <Badge
                                  variant="dot"
                                  color={
                                    ['info', 'info', 'error', 'success'][Requestlist[index].status]
                                  }
                                >
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={`${ApiRoot.replace('api', '')}Contents/User/${
                                      Requestlist[index].senderId
                                    }.jpg`}
                                  >
                                    <PersonIcon />
                                  </Avatar>
                                </Badge>
                              </ListItemAvatar>
                              <ListItemText
                                primary={Requestlist[index].seviceType.title}
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
                                        {`${Requestlist[index].pName} - ${Requestlist[index].pDescription}`}
                                      </Typography>
                                    </div>
                                    {Requestlist[index]?.status === 2 && (
                                      <Typography
                                        style={{
                                          display:
                                            Requestlist[index]?.status === 2 ? 'inline' : 'none'
                                        }}
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        تم الغاء الطلب
                                      </Typography>
                                    )}
                                    {Requestlist[index].status !== 2 && (
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'start',
                                          gap: 15
                                        }}
                                      >
                                        <Typography
                                          sx={{ display: 'inline' }}
                                          component="span"
                                          variant="body2"
                                          color="text.primary"
                                        >
                                          تواصل مع طالب الخدمة :
                                        </Typography>
                                        <Typography
                                          sx={{ display: 'inline' }}
                                          component="span"
                                          variant="body2"
                                          color="text.primary"
                                        >
                                          {Requestlist[index]?.user?.name}
                                        </Typography>
                                        <Typography
                                          sx={{ display: 'inline' }}
                                          component="span"
                                          variant="body2"
                                          color="text.primary"
                                        >
                                          {Requestlist[index]?.user?.phone}
                                        </Typography>
                                      </div>
                                    )}
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
              </TabPanel>
              <TabPanel value="2">
                <Stack spacing={3}>
                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {ScopeRequests.length > 0 &&
                      ScopeRequests.slice((x) => x.status !== 0).map((item, index) => (
                        <>
                          <ListItem
                            key={index}
                            secondaryAction={
                              <Button
                                onClick={() => {
                                  hadleAcceptService(item.id);
                                }}
                                color="success"
                              >
                                استلام
                              </Button>
                            }
                            alignItems="flex-start"
                          >
                            <ListItemButton
                              onClick={() => {
                                window.location.href = `/Service/AcceptedRequest?id=${item.id}`;
                              }}
                            >
                              <ListItemAvatar>
                                <Badge
                                  variant="dot"
                                  color={['info', 'info', 'error', 'success'][item?.status]}
                                >
                                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg">
                                    <PersonIcon />
                                  </Avatar>
                                </Badge>
                              </ListItemAvatar>
                              <ListItemText
                                primary={item?.seviceType?.title}
                                secondary={
                                  <>
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {item.pName}
                                    </Typography>
                                    {item.pDescription}
                                  </>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </>
                      ))}
                  </List>
                </Stack>
              </TabPanel>
            </TabContext>
          </Box>

          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">سبب الرفض</DialogTitle>
            <DialogContent style={{ width: 500, padding: 5 }} margin="denes">
              <TextField
                value={Reason}
                label=""
                fullWidth
                size="small"
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button color="success" autoFocus onClick={handleClose}>
                الفاء
              </Button>
              <Button
                color="error"
                disabled={Boolean(!Reason)}
                onClick={async () => {
                  await handleFailedrequest();
                }}
                autoFocus
              >
                رفض
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={openDel}
            onClose={handleCloseDel}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">تقييم طالب الخدمة</DialogTitle>
            <DialogContent style={{ width: 500, padding: 5 }} margin="denes">
              <div
                style={{
                  paddingTop: '20px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography>تقييم طالب الخدمة</Typography>
                <Rating
                  name="half-rating"
                  onChange={(e) => {
                    setRateValue(e.target.value);
                  }}
                  value={rateValue}
                  precision={0.5}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="error" autoFocus onClick={handleCloseDel}>
                الغاء
              </Button>
              <Button
                color="success"
                disiabled={Boolean(!Evaluation)}
                onClick={async () => {
                  await handleDeliveredRequest();
                }}
                autoFocus
              >
                تقديم
              </Button>
            </DialogActions>
          </Dialog>
        </ContentStyle>
      </Container>
      <SnackBar message={Message} />
    </RootStyle>
  );
}
