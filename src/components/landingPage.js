import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Container,
  CardActions,
  Button
} from '@mui/material';
import { Slide } from 'react-slideshow-image';
import { styled, makeStyles } from '@mui/styles';

import 'animate.css/animate.min.css';

import 'react-slideshow-image/dist/styles.css';

const PaperStyled = styled(Paper)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  margin: 'auto',
  height: 350,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeate'
}));

const RowFlex = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: '100%',
  padding: '40px',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column-reverse',
    gap: 50
  }
}));

const RowCard = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '40px',
  gap: 20,
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column'
  }
}));

const ColText = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  [theme.breakpoints.down('lg')]: {
    width: '100%'
  }
}));

const CardCustom = styled(Card)(({ theme }) => ({
  width: '50%',
  height: '100%',
  [theme.breakpoints.down('lg')]: {
    width: '100%'
  }
}));

const Footer = styled('footer')(({ theme }) => ({
  position: 'relative',
  left: 0,
  bottom: 0,
  width: '100%',
  height: 150,
  backgroundColor: 'red',
  color: 'white',
  textAlign: 'center'
}));

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    }
  }
}));

function LandingPage(props) {
  const classes = useStyles();

  const slideImages = [
    'https://image.freepik.com/free-vector/flat-hand-drawn-patient-taking-medical-examination_52683-57828.jpg',
    'https://image.freepik.com/free-vector/person-with-cold-concept-illustration_114360-1594.jpg',
    'https://image.freepik.com/free-vector/group-doctors-standing-hospital-building-team-practitioners-ambulance-car_74855-14034.jpg'
  ];

  return (
    <Container maxWidth="xl">
      <div>
        <Slide easing="ease">
          {slideImages.map((item, index) => (
            <div className="each-slide">
              <PaperStyled style={{ backgroundImage: `url(${item})` }}>this card</PaperStyled>
            </div>
          ))}
        </Slide>
      </div>
      <RowFlex className="container">
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
          <path
            d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            style={{ stroke: 'none', fill: '#00AB55' }}
          />
        </svg>
        <ColText>
          <Typography variant="h2" className={classes.textCenter} gutterBottom component="div">
            h4. Heading
          </Typography>
          <Typography variant="h4" className={classes.textCenter} gutterBottom component="div">
            h4. Heading
          </Typography>
          <Typography variant="body2" className={classes.textCenter} gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
            numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
        </ColText>
        <CardCustom>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://image.freepik.com/free-vector/group-doctors-standing-hospital-building-team-practitioners-ambulance-car_74855-14034.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </CardCustom>
      </RowFlex>
      <RowCard>
        {slideImages.map((item, index) => (
          <Card Key={index}>
            <CardActionArea>
              <CardMedia component="img" height="140" image={item} alt="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                  ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        ))}
      </RowCard>
      <Footer>
        <p>dsssssssssssssss</p>
      </Footer>
    </Container>
  );
}

export default LandingPage;
