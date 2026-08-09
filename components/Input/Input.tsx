"use client";

import { forwardRef } from "react";
import {
  EndAdornment,
  Field,
  Helper,
  InputRoot,
  InputWrap,
  Label,
} from "@/components/Input/Input.styles";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  endAdornment?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, endAdornment, ...props },
  ref,
) {
  const inputId = id ?? props.name;

  return (
    <Field htmlFor={inputId}>
      {label ? <Label>{label}</Label> : null}
      <InputWrap>
        <InputRoot
          id={inputId}
          ref={ref}
          $hasError={Boolean(error)}
          $hasEndAdornment={Boolean(endAdornment)}
          {...props}
        />
        {endAdornment ? <EndAdornment>{endAdornment}</EndAdornment> : null}
      </InputWrap>
      {error ? <Helper $error>{error}</Helper> : null}
      {!error && hint ? <Helper>{hint}</Helper> : null}
    </Field>
  );
});
