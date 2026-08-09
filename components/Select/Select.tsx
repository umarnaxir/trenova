"use client";

import { forwardRef } from "react";
import { Field, Helper, Label } from "@/components/Input/Input.styles";
import { SelectRoot } from "@/components/Select/Select.styles";

type Option = { label: string; value: string };

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ label, error, options, id, ...props }, ref) {
    const selectId = id ?? props.name;

    return (
      <Field htmlFor={selectId}>
        {label ? <Label>{label}</Label> : null}
        <SelectRoot id={selectId} ref={ref} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectRoot>
        {error ? <Helper $error>{error}</Helper> : null}
      </Field>
    );
  },
);
