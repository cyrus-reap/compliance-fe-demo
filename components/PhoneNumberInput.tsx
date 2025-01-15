"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <PhoneInput
      country={"us"}
      value={value}
      onChange={onChange}
      containerStyle={{ width: "100%" }}
      inputStyle={{
        width: "100%",
        height: "40px",
        borderRadius: "4px",
        border: "1px solid #d9d9d9",
      }}
      dropdownStyle={{
        borderRadius: "4px",
        border: "1px solid #d9d9d9",
      }}
    />
  );
};

export default PhoneNumberInput;
