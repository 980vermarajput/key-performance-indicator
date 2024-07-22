import React from "react";

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-input rounded-lg py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
