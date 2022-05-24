import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { CssBaseline, Typography, ButtonGroup, Button, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './Header';
import PlaceToVisit from './PlaceToVisit';
import Section1 from './Section1';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '55vh',
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
  const IsMobile = useMediaQuery('(max-width:600px)');
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();

  return (
    <div className={classes.root} style={{ gap: IsMobile ? 15 : '' }}>
      <CssBaseline />
      <Header />
      <Section1 />
      <PlaceToVisit />

      {IsMobile ? (
        <Accordion
          expanded={expanded}
          onChange={() => {
            setExpanded(!expanded);
          }}
          style={{
            backgroundColor: theme.palette.primary.main
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            style={{
              marginBottom: expanded ? 75 : 0
            }}
          >
            {!expanded && (
              <Typography
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'white'
                }}
              >
                عنا
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <Footer />
          </AccordionDetails>
        </Accordion>
      ) : (
        <Footer />
      )}
    </div>
  );
}
