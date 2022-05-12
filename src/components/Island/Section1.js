import React from 'react';
import { CssBaseline, Typography, ButtonGroup, Button, Box } from '@mui/material';

export default function Section1() {
  return (
    <div
      style={{
        height: '200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15
      }}
    >
      <h3>This is Typography in mui and pragraoh ion html</h3>
      <p style={{ width: '50%', textAlign: 'center' }}>
        Basic HTML Animals This is the first paragraph in our page. It introduces our animals. The
        Llama Our Llama is a big fan of list items
      </p>

      <Box
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
      </Box>
    </div>
  );
}
