import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

Menu.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function Menu({ options, onSort, error, helperText }) {
  const [val, setVal] = useState(null);
  const change = (e) => {
    onSort(e);
    setVal(e.target.value);
  };

  return (
    <TextField
      select
      size="small"
      value={val}
      label="sex"
      onChange={change}
      error={error}
      helperText={helperText}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
