"use client";

import { useEffect, useState } from "react";
import { Select } from "antd";

const NationalitySelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [nationalityOptions, setNationalityOptions] = useState<string[]>([]);

  useEffect(() => {
    const nationality = require("i18n-nationality");
    nationality.registerLocale(require("i18n-nationality/langs/en.json"));
    const nationalities = nationality.getNames("en");
    setNationalityOptions(Object.values(nationalities));
  }, []);

  return (
    <Select
      className="w-full"
      showSearch
      placeholder="Select nationality"
      value={value}
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.children as any).toLowerCase().includes(input.toLowerCase())
      }
    >
      {nationalityOptions.map((country, i) => (
        <Select.Option key={i} value={country}>
          {country}
        </Select.Option>
      ))}
    </Select>
  );
};

export default NationalitySelector;
