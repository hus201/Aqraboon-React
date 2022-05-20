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
    width: '49%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center'
  },
  imag2: {
    backgroundImage:
      ' linear-gradient(45deg,hsl(143deg 75% 51%) 0%,hsl(134deg 73% 68%) 11%,hsl(131deg 73% 78%) 23%,hsl(128deg 74% 87%) 34%,hsl(126deg 75% 96%) 45%,hsl(130deg 43% 94%) 56%,hsl(132deg 42% 82%) 67%,hsl(134deg 42% 69%) 78%,hsl(138deg 43% 56%) 89%,hsl(150deg 100% 34%) 100%)',
    color: 'white',
    height: '60vh',
    width: '49%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center'
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    display: 'flex',
    alignSelf: 'center',
    margin: '50px',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    color: '#00ab55'
  },
  text2: {
    display: 'flex',
    alignSelf: 'center',
    margin: '50px',
    textDecorationLine: 'underline',
    textDecorationColor: 'yellow',
    color: 'black'
  }
});

export default function ImageCard({ place, checked }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imag}>
        <Typography className={classes.text} variant="h1">
          تطوع الان !
        </Typography>
      </div>
      <div className={classes.imag2}>
        <Typography className={classes.text2} variant="h6">
          هل تملك اي خبرات او مهارات بالعناية بالمرضى او مساعدتهم ؟ شاركنا اذا في مساعدة الاشخاص
          المرضى القريبين منك عبر هذه المنصة واجعل من مهاراتك هذه صدقة جارية في ميزانك وساهم بانشاء
          مجتمع تكافلي افضل !
        </Typography>
      </div>
    </div>
  );
}
