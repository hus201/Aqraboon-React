import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { jssPreset, StylesProvider } from '@mui/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import rtlPlugin from 'stylis-plugin-rtl';
import shape from './shape';
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows
    }),
    []
  );

  const theme = createTheme({ ...themeOptions, direction: 'rtl' });
  theme.components = componentsOverride(theme);

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
  });

  const cacheRtl = createCache({
    key: theme.direction === 'rtl' ? 'cssrtl' : 'cssltr',
    prepend: true,
    stylisPlugins: theme.direction === 'rtl' && [rtlPlugin]
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <StylesProvider jss={jss}>
            <CssBaseline />
            {children}
          </StylesProvider>
        </CacheProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
