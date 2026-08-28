"use client";

import {
  PaymentChip,
  PaymentRow,
} from "@/components/PaymentIcons/PaymentIcons.styles";

const methods = ["Visa", "Mastercard", "UPI", "RuPay", "NetBanking"];

type PaymentIconsProps = {
  tone?: "light" | "dark";
};

export function PaymentIcons({ tone = "light" }: PaymentIconsProps) {
  return (
    <PaymentRow aria-label="Accepted payment methods">
      {methods.map((method) => (
        <PaymentChip key={method} $tone={tone}>
          {method}
        </PaymentChip>
      ))}
    </PaymentRow>
  );
}
