"use client";

import {
  CheckCircle2,
  Clock,
  Clock3,
  CreditCard,
  Heart,
  HelpCircle,
  Leaf,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  PackageCheck,
  PackageOpen,
  Phone,
  RefreshCw,
  RotateCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Truck,
  Wallet,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import {
  CardBody,
  CardGrid,
  CardIcon,
  CardTitle,
  InfoCard,
} from "@/features/content/ContentPage.styles";

const ICONS: Record<string, LucideIcon> = {
  CheckCircle2,
  Clock,
  Clock3,
  CreditCard,
  Heart,
  HelpCircle,
  Leaf,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  PackageCheck,
  PackageOpen,
  Phone,
  RefreshCw,
  RotateCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Truck,
  Wallet,
  XCircle,
};

export type ContentCardItem = {
  title: string;
  body: string;
  icon: keyof typeof ICONS;
};

export function ContentCards({ cards }: { cards: ContentCardItem[] }) {
  return (
    <CardGrid>
      {cards.map((card) => {
        const Icon = ICONS[card.icon] ?? Sparkles;
        return (
          <InfoCard key={card.title}>
            <CardIcon>
              <Icon size={18} />
            </CardIcon>
            <CardTitle>{card.title}</CardTitle>
            <CardBody>{card.body}</CardBody>
          </InfoCard>
        );
      })}
    </CardGrid>
  );
}
