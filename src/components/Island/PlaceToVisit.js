import React from 'react';
import { makeStyles } from '@mui//styles';
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
  return (
    <div className={classes.root} id="place-to-visit">
      <ImageCard place={places[1]} checked={Boolean(checked)} />
      <ImageCard place={places[0]} checked={Boolean(checked)} />
    </div>
  );
}
