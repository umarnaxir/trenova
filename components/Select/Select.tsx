"use client";

import { Field, Helper, Label } from "@/components/Input/Input.styles";
import { SelectRoot } from "@/components/Select/Select.styles";

type Option = { label: string; value: string };

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
};

export function Select({
  label,
  error,
  options,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <Field htmlFor={selectId}>
      {label ? <Label>{label}</Label> : null}
      <SelectRoot id={selectId} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectRoot>
      {error ? <Helper $error>{error}</Helper> : null}
    </Field>
  );
}
