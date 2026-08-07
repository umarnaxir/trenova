"use client";

import { ContainerRoot } from "@/components/Container/Container.styles";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  narrow?: boolean;
  as?: React.ElementType;
};

export function Container({
  narrow = false,
  as = "div",
  ...props
}: ContainerProps) {
  return <ContainerRoot as={as} $narrow={narrow} {...props} />;
}
