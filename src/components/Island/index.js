import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Typography, ButtonGroup, Button, Box } from '@mui/material';
import Header from './Header';
import PlaceToVisit from './PlaceToVisit';
import Section1 from './Section1';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '55vh',
    backgroundImage: `url(${process.env.PUBLIC_URL}/static/Images/1.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 50
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: 0
    }
  }
}));

export default function IsLand() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Section1 />
      <PlaceToVisit />
      <Footer />
    </div>
  );
}