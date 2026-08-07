"use client";

import { Field, Helper, Label } from "@/components/Input/Input.styles";
import { TextAreaRoot } from "@/components/TextArea/TextArea.styles";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function TextArea({ label, error, id, ...props }: TextAreaProps) {
  const areaId = id ?? props.name;

  return (
    <Field htmlFor={areaId}>
      {label ? <Label>{label}</Label> : null}
      <TextAreaRoot id={areaId} $hasError={Boolean(error)} {...props} />
      {error ? <Helper $error>{error}</Helper> : null}
    </Field>
  );
}
