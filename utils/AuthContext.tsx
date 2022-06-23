// import { useToast } from "@chakra-ui/react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import React, { useEffect, useState } from "react";
// import { auth } from "./firebase-config";
// type ContextProps = {
//   user: any;
//   loading: boolean;
//   authenticated: boolean;
//   setUser: any;
//   loadingAuthState: boolean;
// };
// export const AuthContext = React.createContext<Partial<ContextProps>>({});
// export const AuthProvider = ({ children }: any) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingAuthState, setLoadingAuthState] = useState(true);
//   const toast = useToast();
//   useEffect(() => {
//     onAuthStateChanged(auth, (user: any) => {
//       setUser(user);
//       // setLoadingAuthState(false);
//       // if (user && !user.emailVerified) {
//       //   signOut(auth);
//       //   toast({
//       //     title: "please verify your email first! ",
//       //     status: "warning",
//       //     isClosable: true,
//       //   });
//       // }
//     });
//   }, [user]);
//   console.log(user, "user is this");
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authenticated: user !== null,
//         setUser,
//         loadingAuthState,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import { auth } from "./firebase-config";

type ContextProps = {
  loading: boolean;
  user: any;
  authenticated: any;
  setUser: any;
  isSuperAdmin: boolean;
};

export const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(null as boolean | null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = () => {
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const idToken = await user!.getIdTokenResult();
        if (idToken.claims && idToken.claims.isAdmin) setIsSuperAdmin(true);
      } else {
        setIsSuperAdmin(false);
      }

      setUser(user);
      setAuthenticated(user !== null);
    });
    setLoading(false);
  };

  console.log(user, "user in auth context");
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        authenticated,
        setUser,
        isSuperAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
