import * as Yup from 'yup';
import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Stack,
  Autocomplete,
  Tooltip,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import ApiRoot from '../../Test/APiRoot';
import { DatePeriod } from '../../Test/DatePeriod';
import { AuthContext } from '../../utils/ContextProvider';
import Mune from './Menu';

export const AddServiceForm = (props) => {
  useEffect(async () => {
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      }
    };

    const url = `${ApiRoot}/Service/GetServicesType`;
    const response = await fetch(url, options);

    if (response.ok && response.status === 200) {
      const result = await response.json();
      setServices([...result.services]);
    }
  }, [0]);
  const [values, setValues] = useState({
    Service: '',
    Gender: 0
  });
  const RegisterSchema = Yup.object().shape({
    Service: Yup.string().nullable()
  });
  const formik = useFormik({
    initialValues: {
      Service: '',
      Gender: 0
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      SubmitForm(setValues);
    }
  });

  const SubmitForm = async (values) => {
    const { Gender, Service } = values;

    const data = new FormData();

    imagesData.forEach((file) => {
      data.append('battlePlans', file, file.name);
    });

    const ServiceType = 5;
    data.append(
      'ServiceType',
      JSON.stringify({
        TypeId: 5,
        Gender: 2,
        AgeFrom: 0,
        AgeTo: 77
      })
    );

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      },
      body: data
    };

    const url = `${ApiRoot}/Service/SaveService`;
    const response = await fetch(url, options);

    if (response?.ok && response?.status === 200) {
      console.log(response);
    }
  };

  const { errors, touched, handleSubmit, setFieldValue, isSubmitting, getFieldProps } = formik;

  const [services, setServices] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const authContext = useContext(AuthContext);
  const User = authContext.getUser();
  const onChangeGender = (e) => {
    setFieldValue('Gender', e.target.value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Stack spacing={3}>
                  <Autocomplete
                    id="size-small-outlined"
                    onChange={(e, value) => setFieldValue('Service', value?.title || '')}
                    size="small"
                    options={[...services]}
                    getOptionLabel={(option) => option?.title}
                    renderInput={(params) => (
                      <TextField
                        {...getFieldProps('Service')}
                        error={Boolean(errors?.Service)}
                        helperText={errors?.Service}
                        {...params}
                        label="نوع الخدمة المطلوبة"
                      />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item md={12} xs={12}>
                <Stack spacing={3}>
                  <Mune
                    options={[
                      { label: 'All', value: 0 },
                      { label: 'male', value: 1 },
                      { label: 'female', value: 2 }
                    ]}
                    onSort={onChangeGender}
                  />
                </Stack>
              </Grid>

              <Grid item md={12} xs={12} style={{ display: 'flex' }}>
                <Grid md={6} xs={12} space={1}>
                  <Autocomplete
                    id="size-small-outlined"
                    onChange={(e, value) => setFieldValue('Service', value || '')}
                    size="small"
                    options={[...DatePeriod]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...getFieldProps('Service')}
                        error={Boolean(errors?.Service)}
                        helperText={errors?.Service}
                        {...params}
                        label="نوع الخدمة المطلوبة"
                      />
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12} space={1}>
                  <Autocomplete
                    id="size-small-outlined"
                    onChange={(e, value) => setFieldValue('Service', value || '')}
                    size="small"
                    options={[...DatePeriod]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...getFieldProps('Service')}
                        error={Boolean(errors?.Service)}
                        helperText={errors?.Service}
                        {...params}
                        label="نوع الخدمة المطلوبة"
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid item md={12} xs={12}>
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    onInput={(e) => {
                      setImagesData([...imagesData, ...e.target.files]);
                    }}
                  />
                  <Button disabled={imagesData.length > 2} variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              </Grid>
              <Grid item md={12} xs={12}>
                <ImageList sx={{ width: '100%', height: 'auto' }} cols={3}>
                  {imagesData.map((item, index) => (
                    <ImageListItem key={index} style={{ MaxWidth: '32%' }}>
                      <img
                        style={{ width: 'auto', flexGrow: 0 }}
                        src={`${window.URL.createObjectURL(item)}`} //   ?w=248&fit=crop&auto=format
                        srcSet={`${window.URL.createObjectURL(item)}`} //   ?w=248&fit=crop&auto=format&dpr=2 2x
                        alt={item.name}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.name}
                        subtitle={
                          <Button
                            onClick={() => {
                              setImagesData([...imagesData.filter((x, i) => i !== index)]);
                            }}
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        }
                        position="below"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button color="primary" variant="contained" type="submit">
              Saveservice
            </Button>
          </Box>
        </Card>
      </Form>
    </FormikProvider>
  );
};
