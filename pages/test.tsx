import React from "react";
import PrivateRoute from "../withPrivateRoute";

const Test = () => {
  return <div>Test</div>;
};

export default PrivateRoute(Test);
