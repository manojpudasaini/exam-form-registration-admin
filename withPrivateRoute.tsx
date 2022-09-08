import React, { useContext, useEffect } from "react";
import Router from "next/router";

import { AuthContext } from "./utils/AuthContext";
import { Flex, Spinner } from "@chakra-ui/react";

const PrivateRoute = (AuthComponent: any) => {
  function PrivateComponent({ children }: any) {
    const { authenticated, loading, user } = useContext(AuthContext);
    useEffect(() => {
      const { pathname } = Router;
      if (!loading) {
        if (authenticated !== null && !authenticated) {
          Router.push("/login");
          return;
        }

        if (authenticated && pathname == "/") {
          Router.push("/");
        }
      }
    }, [authenticated, loading, user]);

    if (loading) {
      return (
        <Flex h="80vh" align={"center"} justifyContent={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      );
    }
    return <>{authenticated && <> {children} </>} </>;
  }
  return class Higher extends React.Component {
    render() {
      return (
        <PrivateComponent>
          <AuthComponent {...this.props} />
        </PrivateComponent>
      );
    }
  };
};

export default PrivateRoute;
