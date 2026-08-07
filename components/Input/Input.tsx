"use client";

import { forwardRef } from "react";
import {
  Field,
  Helper,
  InputRoot,
  Label,
} from "@/components/Input/Input.styles";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, ...props },
  ref,
) {
  const inputId = id ?? props.name;

  return (
    <Field htmlFor={inputId}>
      {label ? <Label>{label}</Label> : null}
      <InputRoot
        id={inputId}
        ref={ref}
        $hasError={Boolean(error)}
        {...props}
      />
      {error ? <Helper $error>{error}</Helper> : null}
      {!error && hint ? <Helper>{hint}</Helper> : null}
    </Field>
  );
});
