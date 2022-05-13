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
  React.useEffect(async () => {
    const url = `${ApiRoot}/Service/GetUserRequests`;
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
    console.log('response', response);
    if (response.ok && response.status === 200) {
      const result = await response.json();
      console.log('result', result);
      setRequestlist([...result.value.requests]);
      setAcceptedRequests([...result.value.acceptedRequests]);
      setRatings([...result.value.rating]);
    }
  }, [0]);

  const [Requestlist, setRequestlist] = React.useState([]);
  const [Ratings, setRatings] = React.useState([]);
  const authContext = React.useContext(AuthContext);
  const [AcceptedRequests, setAcceptedRequests] = React.useState([]);
  const theme = useTheme();
  const User = authContext.getUser();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [openDel, setopenDel] = React.useState(false);
  const [RequestId, setRequestId] = React.useState(0);
  const [Reason, setReason] = React.useState('');
  const [Report, setReport] = React.useState('');
  const [Evaluation, setEvaluation] = React.useState('');
  const [rateValue, setRateValue] = React.useState(5);
  const [Message, setMessage] = React.useState('');
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
  const handleReportRequest = async () => {
    const data = new FormData();
    data.append('desc', Report);
    data.append('reqId', RequestId);

    const url = `${ApiRoot}/Service/UserReportVolunteer`;
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
      } else {
        setMessage('فشل حفظ المعلومات ');
      }
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
        setRequestlist([...updateArray(RequestId, 1)]);
      } else {
        setMessage('فشل حفظ المعلومات ');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateArray = (id, val, arr = [...Requestlist], name = 'status') => {
    const index = arr.findIndex((x) => x.id === id);
    const newArray = [...arr];
    if (index !== -1) {
      newArray[index][name] = val;
    }
    return newArray;
  };

  return (
    <RootStyle title="Accepted reques list">
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              الخدمات المطلوبة
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>تفاصيل الطلب </Typography> */}
          </Stack>

          <Box sx={{ width: '100%' }}>
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
                                استلمت الخدمة
                              </Button>
                            )}
                            {Requestlist[index].status === 1 && (
                              <Button
                                onClick={() => {
                                  handleClickOpen(Requestlist[index].id);
                                }}
                                color="error"
                              >
                                شكوى
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
                                {Ratings.filter((x) => x?.requestId === Requestlist[index].id)[0]
                                  ?.value > 0 ? (
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
                                    قيم مقدم الخدمة
                                  </Button>
                                )}
                              </Typography>
                            )}
                          </div>
                        }
                        alignItems="flex-start"
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Badge
                              variant="dot"
                              color={
                                ['info', 'success', 'error', 'success'][Requestlist[index].status]
                              }
                            >
                              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg">
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

                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'start',
                                    gap: 15
                                  }}
                                >
                                  {Requestlist[index]?.status !== 2 && Requestlist[index]?.user && (
                                    <>
                                      <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        تواصل مع مقدم الخدمة :
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
                                    </>
                                  )}
                                  {!Requestlist[index]?.user && Requestlist[index]?.status !== 2 ? (
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      بانتظار قبول الطلب ...
                                    </Typography>
                                  ) : (
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

          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">سبب الرفض</DialogTitle>
            <DialogContent style={{ width: 500, padding: 5 }} margin="denes">
              <TextField
                value={Report}
                label="Outlined"
                fullWidth
                size="small"
                onChange={(e) => {
                  setReport(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button color="error" autoFocus onClick={handleClose}>
                الغاء
              </Button>
              <Button
                color="success"
                disiabled={Boolean(!Reason)}
                onClick={async () => {
                  await handleReportRequest();
                }}
                autoFocus
              >
                تقديم
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={openDel}
            onClose={handleCloseDel}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">هل تم تقديم الخدمة بشكل جيد</DialogTitle>
            <DialogContent style={{ width: 500, padding: 5 }} margin="denes">
              <TextField
                value={Evaluation}
                label="نعليقك"
                fullWidth
                size="small"
                onChange={(e) => {
                  setEvaluation(e.target.value);
                }}
              />
              <Divider />
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
                <Typography>قيم مقدم الخدمة</Typography>
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
                الفاء
              </Button>
              <Button
                color="success"
                disabled={Boolean(!Evaluation)}
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
