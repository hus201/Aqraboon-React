import { useEffect, useState } from 'react';
import { Stack, TextField, Autocomplete } from '@mui/material';
import { values } from 'lodash';

export default function VolunteerForm({ errors, values, setObjValues }) {
  const options = [
    { title: 'كلاهما', value: 3 },
    { title: 'ذكر', value: 1 },
    { title: 'انثى', value: 2 }
  ];
  useEffect(() => {
    setVolunteerSex(options[values.VolunteerSex]);
  }, [values]);
  const [VolunteerSex, setVolunteerSex] = useState(options[0]);

  return (
    <Stack spacing={3}>
      <Autocomplete
        id="size-small-outlined"
        size="small"
        options={options}
        value={VolunteerSex}
        onChange={(e, NewVal) => {
          setVolunteerSex(NewVal);
          setObjValues('VolunteerSex', NewVal.value);
        }}
        getOptionLabel={(option) => option?.title || ''}
        renderInput={(params) => (
          <TextField
            error={Boolean(errors?.VolunteerSex)}
            helperText={errors?.ms?.VolunteerSex}
            {...params}
            label="جنس مقدم الخدمة"
          />
        )}
      />
    </Stack>
  );
}
