"use client";

import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { ANNOUNCEMENTS } from "@/constants/site";
import {
  Bar,
  Group,
  Item,
  Track,
} from "@/components/layout/AnnouncementBar/AnnouncementBar.styles";

const announcementItems = [
  { text: ANNOUNCEMENTS[0], icon: Truck },
  { text: ANNOUNCEMENTS[1], icon: ShieldCheck },
  { text: ANNOUNCEMENTS[2], icon: RotateCcw },
];

export function AnnouncementBar() {
  const items = [...announcementItems, ...announcementItems, ...announcementItems];

  return (
    <Bar role="region" aria-label="Site announcements">
      <Track>
        <Group>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Item key={`a-${index}`}>
                <Icon size={14} strokeWidth={2} />
                <span>{item.text}</span>
              </Item>
            );
          })}
        </Group>
        <Group aria-hidden>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Item key={`b-${index}`}>
                <Icon size={14} strokeWidth={2} />
                <span>{item.text}</span>
              </Item>
            );
          })}
        </Group>
      </Track>
    </Bar>
  );
}

