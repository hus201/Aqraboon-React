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

export default function ServicesTypes() {
  React.useEffect(async () => {
    const url = `${ApiRoot}/Service/GetServicesTypes`;
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

    const url = `${ApiRoot}/Service/RemoveServiceType`;
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
        setMessage('???? ?????? ?????????????????? ??????????');
        setRequestlist([...removeArrayObj(RequestId)]);
        await UpdateUser(authContext);
      } else {
        setMessage('?????? ?????? ?????????????????? ');
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
    <RootStyle title="????????????   | ????????????">
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              ???????????? ??????????????
            </Typography>
            <Button
              size="small"
              style={{ width: 150 }}
              variant="outlined"
              href="/Service/AddServiceType"
            >
              ?????????? ?????? ??????????
            </Button>
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
                            <Button href={`/Service/AddServiceType?id=${item.id}`} color="success">
                              ??????????
                            </Button>
                            <Button
                              onClick={() => {
                                handleClickOpen(item.id);
                              }}
                              color="error"
                            >
                              ??????
                            </Button>
                          </div>
                        }
                        alignItems="flex-start"
                      >
                        <ListItemButton>
                          <ListItemText
                            primary={item.title}
                            secondary={
                              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item.category === '3' && ' ???????? ?????????? ?????????? ????????????'}
                                  {item.category === '1' && ' ???????? ???? ?????????? ?????????? ????????????'}
                                  {item.category === '2' && '????????????'}
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
            <DialogTitle id="responsive-dialog-title">???? ?????? ?????????? ???? ??????????</DialogTitle>
            <DialogActions style={{ width: 350 }}>
              <Button color="error" autoFocus onClick={handleClose}>
                ??????????
              </Button>
              <Button
                color="success"
                onClick={async () => {
                  await handleRemoveService();
                }}
              >
                ??????
              </Button>
            </DialogActions>
          </Dialog>
        </ContentStyle>
      </Container>
      <SnackBar message={Message} />
    </RootStyle>
  );
}
