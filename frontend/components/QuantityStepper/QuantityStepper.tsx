"use client";

import { Minus, Plus } from "lucide-react";
import {
  StepButton,
  Stepper,
  Value,
} from "@/components/QuantityStepper/QuantityStepper.styles";

type QuantityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantityStepperProps) {
  return (
    <Stepper>
      <StepButton
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={14} />
      </StepButton>
      <Value aria-live="polite">{value}</Value>
      <StepButton
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={14} />
      </StepButton>
    </Stepper>
  );
}
