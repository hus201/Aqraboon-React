import React from 'react';
import { CssBaseline, Typography, ButtonGroup, Button, Box } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FaceIcon from '@mui/icons-material/Face';
import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  iconClass: {
    color: theme.palette.primary.main,
    fontSize: 50
  },
  iconClass2: {
    color: theme.palette.primary.main,
    fontSize: 100
  },
  text: { fontSize: 35 }
}));

export default function Section1() {
  const classes = useStyles();
  const IsMobile = useMediaQuery('(max-width:600px)');
  return (
    <div
      style={{
        minHeight: '200px',
        height: 'fit-content',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 45
      }}
    >
      <p
        style={{
          width: IsMobile ? '100%' : '50%',
          textAlign: 'center',
          fontSize: IsMobile ? 22 : ''
        }}
      >
        <h3 style={{ margin: 10 }}>
          اقربون منصة خدمات العناية بالمرضى بالمنزل التطوعية الاولى من نوعها في الاردن
        </h3>
        تهدف هذه المنصة الى تطوير العلاقات الاجتماعية الودية بين افراد مجتمع عبر اطفاء شكل من اشكال
        التعاون في احد الامور الانسانية التي نتعامل معه بشكل دائم
      </p>

      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1
          }
        }}
      >
        <ButtonGroup size="large" aria-label="large button group">
          {[<Button key="two">Two</Button>, <Button key="three">Three</Button>]}
        </ButtonGroup>
      </Box> */}
      <div
        style={{
          display: 'flex',
          flexDirection: IsMobile ? 'column' : 'row',
          gap: IsMobile ? 50 : 5,
          width: '100%',
          justifyContent: 'space-around'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}>
          <AccessibilityNewIcon className={IsMobile ? classes.iconClass2 : classes.iconClass} />
          <Typography className={IsMobile ? classes.text : ''}> مريض 500+</Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}>
          <FaceIcon className={IsMobile ? classes.iconClass2 : classes.iconClass} />
          <Typography className={IsMobile ? classes.text : ''}> ممرض 200+</Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}>
          <MapsHomeWorkIcon className={IsMobile ? classes.iconClass2 : classes.iconClass} />
          <Typography className={IsMobile ? classes.text : ''}> حي سكني 50+</Typography>
        </div>
      </div>
    </div>
  );
}
