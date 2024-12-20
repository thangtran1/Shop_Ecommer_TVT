import React, { memo } from "react";
import clsx from "clsx";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  style,
  type = "text",
  placeholder,
  fullWidth,
  ...rest
}) => {
  return (
    <div className={clsx("flex flex-col h-[78px] gap-2", style)}>
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label + ":"}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx("form-input", fullWidth && "w-full", style)}
        {...rest}
      />
      {errors[id] && (
        <small className="text-red-500 text-sm">{errors[id].message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
