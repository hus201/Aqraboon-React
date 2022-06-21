import * as Yup from 'yup';
import { useState, useEffect, useContext, useRef } from 'react';
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
  ImageList,
  ImageListItem,
  ImageListItemBar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import ApiRoot from '../../Test/APiRoot';
import { DatePeriod } from '../../Test/DatePeriod';
import { AuthContext } from '../../utils/ContextProvider';
import { GetLocationMap } from '../../utils/Maps';
import { UpdateUser } from '../../utils/UpdateUserInfo';
import Mune from './Menu';
import SnackBar from '../SnackBar';

export const AddServiceForm = (props) => {
  useEffect(async () => {
    const Url = new window.URL(window.location.href);
    const id = Url.searchParams.get('id');
    setId(id);
    const url = `${ApiRoot}/Service/GetService?id=${id}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${User.token}`
      }
    };
    try {
      const response = await fetch(url, options);
      if (response.ok && response.status === 200) {
        const result = await response.json();
        const { service } = result.value;

        //   setFieldValue('Lng', service.lat);
        //   setFieldValue('Lat', service.lng);
        setFieldValue('Gender', service.gender);
        setFieldValue('AgeTo', service.ageTo);
        setFieldValue('AgeFrom', service.ageFrom);
        setFieldValue('TypeId', service.typeId);
      }
    } catch (e) {
      console.log(e);
    }
  }, [0]);
  useEffect(async () => {
    if (User?.id) {
      const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${User.token}`
        }
      };
      try {
        const url = `${ApiRoot}/Service/GetServicesType`;
        const response = await fetch(url, options);

        if (response.ok && response.status === 200) {
          const result = await response.json();
          setServices([...result.services]);
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  }, [0]);

  const [services, setServices] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState(0);
  const authContext = useContext(AuthContext);
  const User = authContext.getUser();

  const RegisterSchema = Yup.object().shape({
    TypeId: Yup.number().required('بجب تحديد توع الخدمة'),
    Gender: Yup.number().required('بجب تحديد جنس المريض'),
    AgeFrom: Yup.number().required('بجب تحديد فترة العمر'),
    AgeTo: Yup.number().required('بجب تحديد فترة العمر'),
    //  Lng: Yup.string().required('يجب تحديد منطة تقديم الخدمة'),
    //  Lat: Yup.string().required('يجب تحديد منطة تقديم الخدمة'),
    UserLocation: Yup.boolean().required()
  });
  const formik = useFormik({
    initialValues: {
      TypeId: '',
      Gender: '',
      AgeFrom: '',
      AgeTo: '',
      //  Lat: User.lat,
      //  Lng: User.lng,
      UserLocation: false
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      SubmitForm(values);
    }
  });

  const SubmitForm = async (values) => {
    const { TypeId, Gender, AgeFrom, AgeTo } = values; // , Lat, Lng

    const data = new FormData();

    imagesData.forEach((file) => {
      data.append('battlePlans', file, file.name);
    });

    const Service = JSON.stringify({ TypeId, Gender, AgeFrom, AgeTo }); // , Lat, Lng
    data.append('service', Service);
    data.append('Id', id);

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
      setMessage('تم الحفظ بنجاح');
      formik.resetForm();
      setMessage(await UpdateUser(authContext));
      setTimeout(() => {
        window.location.href = '/Service/ProvidedList';
      }, [500]);
    } else {
      setMessage('فشل الحفظ');
    }
  };

  const { errors, touched, handleSubmit, setFieldValue, isSubmitting, getFieldProps, values } =
    formik;

  const onChangeGender = (e) => {
    setFieldValue('Gender', e.target.value);
  };
  // const handleChangeLocation = (lat, lng) => {
  //   setFieldValue('Lng', lat);
  //   setFieldValue('Lat', lng);
  // };

  useEffect(() => {
    try {
      if (services.filter((x) => x.id === values.TypeId)[0]?.category === '1') {
        setImagesData([]);
      }
    } catch (e) {
      console.log('catch success');
    }
  }, [values.TypeId]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="تفاصيل الخدمة" title="تقديم خدمة كمتطوع" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Stack spacing={3}>
                  <Autocomplete
                    id="size-small-outlined"
                    onChange={(e, value) => {
                      if (value?.id === '2') {
                        setFieldValue('AgeFrom', -1);
                        setFieldValue('AgeTo', -1);
                        setFieldValue('Gender', 3);
                      }
                      setFieldValue('TypeId', value?.id || '');
                    }}
                    size="small"
                    value={{
                      ...services.filter((x) => x.id === values.TypeId)[0]
                    }}
                    options={[...services]}
                    getOptionLabel={(option) => option?.title || ''}
                    renderInput={(params) => (
                      <TextField
                        {...getFieldProps('TypeId')}
                        error={Boolean(touched?.TypeId && errors?.TypeId)}
                        helperText={touched?.TypeId && errors?.TypeId}
                        {...params}
                        label="نوع الخدمة المطلوبة"
                      />
                    )}
                  />
                </Stack>
              </Grid>
              {services.filter((x) => x.id === values.TypeId)[0]?.category !== '2' && (
                <>
                  <Grid item md={12} xs={12}>
                    <Stack spacing={3}>
                      <Mune
                        options={[
                          { label: 'أي منهما', value: 3 },
                          { label: 'ذكر', value: 1 },
                          { label: 'انثى', value: 2 }
                        ]}
                        CurrentValue={values?.Gender}
                        error={Boolean(touched?.Gender && errors?.Gender)}
                        helperText={touched?.Gender && errors?.Gender}
                        onSort={onChangeGender}
                      />
                    </Stack>
                  </Grid>

                  <Grid item md={12} xs={12} style={{ display: 'flex' }}>
                    <Grid item md={6} xs={12} space={1}>
                      <Autocomplete
                        id="size-small-outlined"
                        onChange={(e, value) => {
                          if (value?.value === -1) {
                            setFieldValue('AgeTo', -1);
                          } else if (value?.value >= values.AgeFrom) {
                            setFieldValue('AgeTo', '');
                          }
                          setFieldValue('AgeFrom', value?.value);
                        }}
                        value={{
                          ...DatePeriod.filter((x) => x.value === values.AgeFrom)[0]
                        }}
                        size="small"
                        options={[...DatePeriod]}
                        getOptionLabel={(option) => option?.title || ''}
                        renderInput={(params) => (
                          <TextField
                            {...getFieldProps('AgeFrom')}
                            error={Boolean(touched?.AgeFrom && errors?.AgeFrom)}
                            helperText={touched?.AgeFrom && errors?.AgeFrom}
                            {...params}
                            label="العمر من"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={6} xs={12} space={1}>
                      <Autocomplete
                        id="size-small-outlined"
                        onChange={(e, value) => setFieldValue('AgeTo', value?.value)}
                        size="small"
                        value={{
                          ...DatePeriod.filter((x) => x.value === values.AgeTo)[0]
                        }}
                        disabled={Boolean(!(typeof values.AgeFrom === 'number'))}
                        options={[...DatePeriod.filter((x) => x.value > values?.AgeFrom)]}
                        getOptionLabel={(option) => option?.title || ''}
                        renderInput={(params) => (
                          <TextField
                            {...getFieldProps('AgeTo')}
                            error={Boolean(touched?.AgeTo && errors?.AgeTo)}
                            helperText={touched?.AgeTo && errors?.AgeTo}
                            {...params}
                            label="الى عمر"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {/* <Grid item md={12} xs={12}>
                {!values.UserLocation && (
                  <Box style={{ height: '300px' }}>
                    <GetLocationMap setLocation={handleChangeLocation} />
                    {Boolean(errors.Lat) && (
                      <FormHelperText style={{ color: 'red' }}>{errors.Lat}</FormHelperText>
                    )}
                  </Box>
                )}
                <FormGroup>
                  <FormControlLabel
                    {...getFieldProps('UserLocation')}
                    error={Boolean(touched?.UserLocation && errors?.UserLocation)}
                    helperText={touched?.UserLocation && errors?.UserLocation}
                    control={<Checkbox checked={Boolean(values?.UserLocation)} />}
                    label="استخدم موقع الحساب الحالي"
                  />
                </FormGroup>
              </Grid> */}

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
                  {services.filter((x) => x.id === values.TypeId)[0]?.category &&
                    services.filter((x) => x.id === values.TypeId)[0]?.category !== '1' && (
                      <Button disabled={imagesData.length > 2} variant="contained" component="span">
                        تحميل ملحقات
                      </Button>
                    )}
                  <Typography style={{ fontSize: 13, padding: 10 }}>
                    {services.filter((x) => x.id === values.TypeId)[0]?.category === '2' &&
                      'يجب تحميل صور الملحق'}
                    {services.filter((x) => x.id === values.TypeId)[0]?.category === '3' &&
                      'هذه الخدمة تحتاج الي شهادة اثبات لتقديمها , يجب رفع صورة الشهادة'}
                  </Typography>
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
                            color="error"
                            onClick={() => {
                              setImagesData([...imagesData.filter((x, i) => i !== index)]);
                            }}
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                          >
                            حذف
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
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={
                services.filter((x) => x.id === values.TypeId)[0]?.category &&
                services.filter((x) => x.id === values.TypeId)[0]?.category !== '1' &&
                imagesData.length < 1
              }
            >
              حفظ
            </Button>
          </Box>
        </Card>
      </Form>
      <SnackBar message={message} />
    </FormikProvider>
  );
};
