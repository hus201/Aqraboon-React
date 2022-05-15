import React from 'react';
import { makeStyles } from '@mui//styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles({
  imag: {
    backgroundColor: 'black',
    color: 'white',
    height: 500,
    width: '49%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default function ImageCard({ place, checked }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imag}>Help where it is needed most.</div>
      <div className={classes.imag}>
        EDUCATION Give Hope Through the last years, we inspired hundreds of people to support us in
        our mission and thereby give thousands of children around the world the possibility to
        acquire English and computer education. Do you want to support us on our mission?
      </div>
    </div>
  );
}
