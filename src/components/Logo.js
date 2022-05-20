import PropTypes from 'prop-types';
// material
import { Avatar, Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

// export default function Logo({ sx }) {
//   return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
// }

export default function Logo({ sx }) {
  return <Avatar src="../favicon/favicon.png" sx={{ width: 'auto', height: 40, ...sx }} />;
}
