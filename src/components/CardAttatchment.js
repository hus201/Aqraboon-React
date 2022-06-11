import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import {
  Avatar,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  DialogActions,
  Box
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ApiRoot from '../Test/APiRoot';
import SnackBar from './SnackBar';
import { AuthContext } from '../utils/ContextProvider';
import { DisplayPoint } from '../utils/Maps';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function CardAttatchment({ Service, removeServices, isRequested }) {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [OpenAcc, setOpenAcc] = React.useState(false);
  const [Message, setMessage] = React.useState('');
  const [Reason, setReason] = React.useState('');
  const [RequestId, setRequestId] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const authContext = React.useContext(AuthContext);
  const User = authContext.getUser();

  const handleClickOpen = (id) => {
    setRequestId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setReason('');
    setOpen(false);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const hadleAcceptService = (id) => {
    const Config = {
      headers: {
        Authorization: `Bearer ${User.token}`
      }
    };
    const data = new FormData();
    data.append('reqId', id);
    axios
      .post(`${ApiRoot}/Service/UserAcceptAttatch`, data, Config)
      .then((res) => {
        if (res.data.Sccuess) {
          setMessage('تم قبول الطلب');
          removeServices(id);
        } else {
          setMessage('عذرا,حدث خطا ما');
        }
      })
      .catch((err) => {
        setMessage('عذرا,حدث خطا ما');
      });
  };

  const hadleReportService = (id) => {
    const data = new FormData();
    data.append('reqId', id);
    data.append('desc', Reason);
    const config = {
      headers: {
        Authorization: `Bearer ${User.token}`
      }
    };
    axios
      .post(`${ApiRoot}/Service/UserReportAttatch`, data, config)
      .then((res) => {
        if (res.data.Sccuess) {
          setMessage('تم قبول الطلب');
        } else {
          setMessage('عذرا,حدث خطا ما');
        }
      })
      .catch((err) => {
        setMessage('عذرا,حدث خطا ما');
      });
  };

  return (
    <Card style={{ Width: '650px', overflow: 'visible' }}>
      <CardHeader
        avatar={
          <Avatar
            src={`${ApiRoot.replace(/api$/, '')}Contents/User/${Service.userId}.jpg`}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={Service.service_type.title}
        subheader={Service.service_type.desciption}
      />
      <CardMedia
        component="img"
        height="auto"
        style={{ width: 480, margin: 'auto' }}
        image={`${ApiRoot.replace(/api$/, '')}Contents/Service/Attachment/${Service.id}/${
          Service?.attachments[0].attachment
        }`}
        alt="Paella dish"
      />
      {/* <CardContent>
        {Service?.attachments?.filter((x, i) => i !== 0)?.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            صور الملحق
          </Typography>
        )}
      </CardContent> */}
      <CardActions disableSpacing>
        <Button
          onClick={() => {
            handleClickOpen(Service.id);
          }}
          color="error"
        >
          ابلاغ
        </Button>
        <Button
          onClick={() => {
            setOpenAcc(true);
          }}
          color="success"
        >
          عرض الطلب
        </Button>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph> : الوصف</Typography>
          <Typography paragraph>{Service?.service_type?.desciption}</Typography>
          <Grid item md={12} xs={12}>
            <ImageList sx={{ width: '100%', height: 'auto' }} cols={2}>
              {Service?.attachments
                ?.filter((x, i) => i !== 0)
                .map((item, index) => (
                  <ImageListItem key={index} style={{ MaxWidth: '50%' }}>
                    <img
                      style={{ width: 'auto', flexGrow: 0 }}
                      src={`${ApiRoot.replace(/api$/, '')}Contents/Service/Attachment/${
                        Service.id
                      }/${item.attachment}`} //   ?w=248&fit=crop&auto=format
                      srcSet={`${ApiRoot.replace(/api$/, '')}Contents/Service/Attachment/${
                        Service.id
                      }/${item.attachment}`} //   ?w=248&fit=crop&auto=format&dpr=2 2x
                      alt={item?.attachment}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </Grid>
        </CardContent>
      </Collapse>
      <SnackBar message={Message} />

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">سبب البلاغ</DialogTitle>
        <DialogContent style={{ width: 500, padding: 5 }} margin="denes">
          <TextField
            value={Reason}
            label="البلاغ"
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
              await hadleReportService(RequestId);
              setReason('');
              handleClose();
            }}
            autoFocus
          >
            ابلاغ
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={OpenAcc}
        onClose={() => {
          setOpenAcc(false);
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">تفاصيل الطلب</DialogTitle>
        <DialogContent
          style={{
            width: 500,
            padding: 5,
            height: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          margin="denes"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: 8,
              margin: '0 5%',
              alignSelf: 'flex-start'
            }}
          >
            <Typography>مقدم الخدمة : {Service.user.name}</Typography>
            <Typography>رقم الهاتف : {Service.user.phone}</Typography>
            {isRequested && <Typography>الحالة : تم الطلب</Typography>}
            <Typography>الموقع :</Typography>
          </div>
          <Box style={{ width: '90%', height: 200 }}>
            <DisplayPoint Lat={Service.user.lat} Lng={Service.user.lng} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            autoFocus
            onClick={() => {
              setOpenAcc(false);
            }}
          >
            اغلاق
          </Button>
          <Button
            color="primary"
            onClick={async () => {
              await hadleAcceptService(Service.id);
              setOpenAcc(false);
            }}
            autoFocus
            disabled={isRequested}
          >
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
