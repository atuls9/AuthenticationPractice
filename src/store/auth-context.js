import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const firstToken = localStorage.getItem("token");
  const [token, setToken] = useState(firstToken);

  const userLoggedIn = !!token;
  const loginHandler = (tkn) => {
    setTimeout(() => {
      // setToken(null);
      localStorage.removeItem("token");
    }, 5 * 60 * 1000);

    setToken(tkn);
    localStorage.setItem("token", tkn);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const authContextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
