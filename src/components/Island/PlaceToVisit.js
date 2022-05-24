import React from 'react';
import { makeStyles } from '@mui//styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageCard from './ImageCard';
import places from '../../static/places';
import useWindowPosition from '../../hook/useWindowPosition';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  }
}));

export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  const IsMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.root} id="place-to-visit" style={{ minHeight: IsMobile ? '40vh' : '' }}>
      <ImageCard place={places[0]} checked={Boolean(checked)} />
    </div>
  );
}
