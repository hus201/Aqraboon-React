import React from 'react';
import { CssBaseline, Typography, Divider, ButtonGroup, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  iconClass: {
    color: theme.palette.primary.main,
    fontSize: 50
  },
  col: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ro: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25
  },
  fultext: {
    textAlign: 'center'
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        Our story starts with you Follow WeTomorrow on our mission by receiving the latest updates
        via email.
      </div>
      <div className={classes.ro}>
        <div className={classes.col}>
          <h3 className={classes.fultext}>About</h3>
          <Typography className={classes.fultext}>
            At WeTomorrow we strive to give every child the opportunity to acquire English and
            computer skills, thereby gain hope and take their fate back into their own hands.
          </Typography>
        </div>
        <div className={classes.col}>
          <h3 className={classes.fultext}>Contact</h3>
          <Typography className={classes.fultext}>Get in Touch hello@wetomorrow.one</Typography>
        </div>
        <div className={classes.col}>
          <h3 className={classes.fultext}>Links</h3>
          <Typography className={classes.fultext}>
            Projects <br /> Partnerships <br />
            About us <br /> Press Kit
          </Typography>
        </div>
      </div>
      <div className={classes.col}>
        <div className={classes.ro}>impressum privacy policy made with love donate now</div>
        <Typography>
          © 2021 | WeTomorrow, Neuwilstrasse 14, CH-9306 Freidorf, a nonprofit organization
          registered under CHE-158.843.252 at the Commercial Register of Canton Thurgau, Switzerland
        </Typography>
      </div>
    </div>
  );
}
