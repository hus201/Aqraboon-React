import * as React from 'react';

const AuthContext = React.createContext();

function AuthProvider(Props) {
  const setUser = (User) => {
    localStorage.setItem('User', JSON.stringify(User || { IsLogedIn: false }));
    _setUser(User || { IsLogedIn: false });
  };

  const getUser = () => {
    const User = localStorage.getItem('User');
    return JSON.parse(User);
  };

  const [User, _setUser] = React.useState(getUser());

  return (
    <AuthContext.Provider value={{ getUser, setUser, User }}>{Props.children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
