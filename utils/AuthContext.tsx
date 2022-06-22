import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, firebase } from "./firebase-config";
type ContextProps = {
  user: any;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
};
export const AuthContext = React.createContext<Partial<ContextProps>>({});
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  }, []);
  console.log(user, "user is this");
  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
