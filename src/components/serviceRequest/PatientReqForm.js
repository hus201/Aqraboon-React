import { Stack, TextField } from '@mui/material';

export default function PatientReqForm() {
  const Patient = {
    Name: 'Jaydon Frankie',
    Age: 25,
    Sex: 'ذكر',
    Description:
      'المريض من اصحاب الحالات الخاصة يصعب عليه المشي يعاني من امراض سكر و ضغط و معاه جلطة'
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
