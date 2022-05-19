import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@mui/material';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import APIRoot from '../../Test/APiRoot';
import { AuthContext } from '../../utils/ContextProvider';
// ----------------------------------------------------------------------

const getReturnValues = (countDown) => {
  console.log(countDown);
  countDown = new Date().getTime() - countDown;
  console.log(countDown);
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [`${days} يوم - ${hours} ساعة - ${minutes} دقيقة - ${seconds} ثانية`];
};

function renderContent(notification) {
  const title = (
    <>
      <Typography variant="subtitle2">{notification?.seviceType.desciption}</Typography>
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification?.pName}
      </Typography>
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification?.pDescription}
      </Typography>
    </>
  );

  if (notification?.isAccepted) {
    return {
      avatar: (
        <img alt={notification?.description} src="/static/icons/ic_notification_package.svg" />
      ),
      title
    };
  }

  if (!notification?.isAccepted) {
    return {
      avatar: (
        <img alt={notification?.description} src="/static/icons/ic_notification_shipping.svg" />
      ),
      title
    };
  }

  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
      title
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
      title
    };
  }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      to={`/Service/AcceptedRequest?id=${notification.id}`}
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification?.isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {getReturnValues(new Date(notification.date))}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [totalUnRead, setTotalUnRead] = useState(0);
  const authContext = useContext(AuthContext);
  const User = authContext.getUser();
  useEffect(() => {
    if (User?.id && User?.role !== 'User') {
      setInterval(async () => {
        const url = `${APIRoot}/Service/GetVolunteerRequest`;
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
          if (response?.ok && response?.status === 200) {
            const result = await response.json();
            //  [...result.value.aroundScopeRequests]
            setNotifications([...result.value.inScopeRequests]);
            setTotalUnRead(result.value.inScopeRequests.length);
          }
        } catch (error) {
          console.error(error);
        }
      }, [5000]);
    }
  }, [0]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false
      }))
    );
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">الاشعارات</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              لديك {totalUnRead} اشعار غير مقروء
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                {doneAllFill > 0 ? '' : 'ليس لديك اشعارات'}
              </ListSubheader>
            }
          >
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider />
      </MenuPopover>
    </>
  );
}
