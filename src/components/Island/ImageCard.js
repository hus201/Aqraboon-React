import React from 'react';
import { makeStyles } from '@mui//styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles({
  imag: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/static/Images/2.jpg)`,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    height: '60vh',
    width: '100vh',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center'
  },
  imag2: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/static/Images/3.gif)`,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    height: '60vh',
    width: '100vh',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center'
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  text: {
    display: 'flex',
    alignSelf: 'center',
    margin: '50px',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    color: '#00ab55',
    fontSize: 0
  },
  text2: {
    display: 'flex',
    alignSelf: 'center',
    margin: '50px',
    textDecorationLine: 'underline',
    textDecorationColor: 'yellow',
    color: 'black',
    fontSize: 0
  }
});

export default function ImageCard({ place, checked }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imag} />
      <div className={classes.imag2} />
    </div>
  );
}
