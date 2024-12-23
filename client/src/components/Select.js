import React from "react";
import withBase from "hocs/withBase";
const Select = ({
  label,
  options,
  register,
  id,
  errors,
  validate,
  style,
  fullWidth,
}) => {
  return (
    <div className={`flex flex-col ${fullWidth ? "w-full" : ""}`}>
      <label htmlFor={id} className="mb-2">
        {label}
      </label>
      <select
        id={id}
        {...register(id, validate)}
        className={`border rounded p-2 ${style}`}
      >
        <option value="">Select an option</option>
        {options?.map((option) => (
          <option key={option.code} value={option.code}>
            {option.value}
          </option>
        ))}
      </select>
      {errors[id] && <span className="text-red-500">{errors[id].message}</span>}
    </div>
  );
};

export default withBase(Select);
