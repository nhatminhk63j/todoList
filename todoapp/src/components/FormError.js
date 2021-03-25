import React from "react";

const FormError = ({isHidden}) => {
  if (isHidden) {
    return null;
  }

  return <div style={{color: "red"}}>Requied</div>;
};

export default FormError;
