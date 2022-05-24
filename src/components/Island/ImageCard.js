import React from 'react';
import { makeStyles } from '@mui//styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles({
  imag: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/static/Images/2.jpg)`,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    height: '60vh',
    maxWidth: '100%',
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
    maxWidth: '100%',
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
  },
  root2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10
  }
});

export default function ImageCard({ place, checked }) {
  const classes = useStyles();
  const IsMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className={IsMobile ? classes.root2 : classes.root}>
      <div className={classes.imag} style={{ height: IsMobile ? 200 : '' }} />
      <div className={classes.imag2} style={{ height: IsMobile ? 200 : '' }} />
    </div>
  );
}
