import { Stack, TextField } from '@mui/material';

export default function PatientReqForm({ request }) {
  const Patient = {
    Name: request.pName,
    Age: request.pAge,
    Sex: request.pGender,
    Description: request.pDescription
  };
  return (
    <Stack spacing={3}>
      <TextField fullWidth disabled value={Patient.Name} size="small" label="اسم المريض" />
      <TextField
        fullWidth
        disabled
        value={Patient.Description}
        multiline
        maxRows={4}
        size="small"
        label="وصف حالة المريض"
      />
      <TextField fullWidth disabled value={Patient.Age} size="small" label="العمر" />
      <TextField fullWidth disabled value={Patient.Sex} size="small" label="جنس المريض" />
    </Stack>
  );
}
