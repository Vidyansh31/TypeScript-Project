import React, { useContext, createContext } from "react";

interface AuthContextType {
  Login: (name: string, email: string, phone: string) => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  Login: () => {},
  isLoggedIn: () => false,
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const Login = (name: string, email: string, phone: string) => {
    const userInfo = JSON.stringify({
      name,
      email,
      phone,
    });

    localStorage.setItem("userInfo", userInfo);
  };

  const isLoggedIn = () => {
    return localStorage.getItem("userInfo") !== null;
  };

  return (
    <AuthContext.Provider value={{ Login, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
