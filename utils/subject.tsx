import React, { useEffect, useState } from "react";
import { API } from "./api";

const subject = () => {
  const [subjectWithCredits, setSubjectWithCredits] = useState([]);
  useEffect(() => {
    const response: any = API.get(
      "http://localhost:5000/api/v1/subject/getcodecredit"
    );
    setSubjectWithCredits(response);
  }, []);
  console.log(subjectWithCredits, "sub<><><><><><>><>");
  return <div>subject</div>;
};

export default subject;
