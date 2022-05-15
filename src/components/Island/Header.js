import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, IconButton, Toolbar, Collapse, Button } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '70vh',
    fontFamily: 'Nunito'
  },
  appbar: {
    background: 'none'
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto'
  },
  appbarTitle: {
    flexGrow: '1'
  },
  icon: {
    color: '#000',
    fontSize: '2rem'
  },
  colorText: {
    color: '#f29a2e',
    fontSize: '30px'
  },
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: '#000',
    fontSize: '15px',
    width: '50%',
    textAlign: 'start',
    alignSelf: 'start'
  },
  goDown: {
    color: '#f29a2e',
    fontSize: '4rem'
  }
}));

export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'start',
          padding: 55,
          paddingTop: 75
        }}
      >
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
          <div className={classes.container}>
            <p className={classes.title}>
              <span className={classes.colorText}>جيرانك اقرب !</span>
              <p style={{ fontSize: '19px', whiteSpace: 'wrap' }}>
                شاركنا الان في منصة اقربون واحصل او قدم المساعدة الى المرضى في المناطق المحيطة بك
                تعرف وساعد المرضى ممن يحتاجون المساعدة من جيران لك لبناء مجتمع متعاون ومترابط
              </p>
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'start',
                alignItems: 'center'
              }}
            >
              {/* <Scroll to="place-to-visit" smooth={Boolean(true)}>
                <IconButton>
                  <ExpandMoreIcon className={classes.goDown} />
                </IconButton>
              </Scroll> */}
              <Button style={{ width: '25%', height: '55px' }} size="small" variant="contained">
                شاركنا الان
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
