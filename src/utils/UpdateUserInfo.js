import ApiRoot from '../Test/APiRoot';

const UpdateUser = async (authContext) => {
  const User = authContext.getUser();
  const url = `${ApiRoot}/Login/UpdateLogin`;
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
    console.log('response', response);
    if (response.ok && response.status === 200) {
      const result = await response.json();
      const _user = { ...result.value.user, token: result.value.token };
      authContext.setUser(_user);
      return '';
    }
    authContext.setUser(null);
    return 'تم انهاء الجلسة';
  } catch (e) {
    authContext.setUser(null);
    return 'حدت خطا ما ,تم انهاء الجلسة';
  }
};

export { UpdateUser };
