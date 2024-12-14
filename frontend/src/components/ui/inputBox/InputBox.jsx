import React from "react";

export default function InputBox({
  className,
  type,
  name = null,
  defaultValue,
  required,
  onChange,
  ...rest
}) {
  return (
    <input
      type={type}
      className={className}
      name={name}
      onChange={onChange}
      value={defaultValue}
      required={required}
      {...rest}
    />
  );
}
