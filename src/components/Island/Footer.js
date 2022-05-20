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
    justifyContent: 'center',
    color: '#dae2de'
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
    height: '140px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
      <div className={classes.ro}>
        <div className={classes.col}>
          <h3 className={classes.fultext}> عنا</h3>
          <Typography className={classes.fultext}>
            اقربون منصة خدمات العناية بالمرضى بالمنزل التطوعية الاولى من نوعها في الاردن تهدف هذه
            المنصة الى تطوير العلاقات الاجتماعية الودية بين افراد مجتمع عبر اطفاء شكل من اشكال
            التعاون في احد الامور الانسانية التي نتعامل معه بشكل دائم
          </Typography>
        </div>
        <div className={classes.col}>
          <h3 className={classes.fultext}>اتصل بنا </h3>
          <Typography className={classes.fultext}>
            تواصل معنا عبر الايميل الاتي contact@aqraboon.com
          </Typography>
        </div>
        <div className={classes.col} style={{ minWidth: 'fit-content', padding: 8 }}>
          <h3 className={classes.fultext}>الراوبط </h3>
          <Typography className={classes.fultext}>
            <a style={{ textDecoration: 'none', color: '#dae2de' }} href="/register">
              انضم لنا (تسجيل)
            </a>
            <br />
            <a style={{ textDecoration: 'none', color: '#dae2de' }} href="/login">
              سجل دخول (تسجيل دخول )
            </a>
          </Typography>
        </div>
      </div>
      <div className={classes.col}>
        <div className={classes.ro}>Aqraboon Team @2022</div>
      </div>
    </div>
  );
}
