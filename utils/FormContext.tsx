import { createContext, useContext, useState } from "react";

export const FormContext = createContext<Partial<any>>({});

export const FormProvider = (props: any) => {
  const [data, setData] = useState({});

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <FormContext.Provider value={{ data, setFormValues }}>
      {props.children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
