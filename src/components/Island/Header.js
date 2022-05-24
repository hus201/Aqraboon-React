import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Collapse, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '400px',
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
  colorText2: {
    color: '#f29a2e',
    fontSize: '50px'
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
  title2: {
    color: '#000',
    fontSize: '15px',
    alignSelf: 'start',
    width: '100%',
    textAlign: 'center'
  },
  goDown: {
    color: '#f29a2e',
    fontSize: '4rem'
  }
}));

export default function Header() {
  const classes = useStyles();
  const IsMobile = useMediaQuery('(max-width:600px)');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/static/Images/${
            IsMobile ? '4.png' : '1.jpg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: IsMobile ? 'auto 100%' : '100%',
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
            <p className={IsMobile ? classes.title2 : classes.title}>
              <span className={IsMobile ? classes.colorText2 : classes.colorText}>
                جيرانك اقرب !
              </span>
              <p
                style={{
                  fontSize: '19px',
                  whiteSpace: 'wrap',
                  width: IsMobile ? '100%' : '',
                  color: IsMobile ? 'white' : '',
                  marginBottom: IsMobile ? 10 : ''
                }}
              >
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
              <Button
                style={{ width: IsMobile ? '100%' : '25%', height: '55px' }}
                size="small"
                variant="contained"
              >
                شاركنا الان
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
