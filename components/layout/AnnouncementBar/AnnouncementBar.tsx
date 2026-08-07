"use client";

import { ANNOUNCEMENTS } from "@/constants/site";
import {
  Bar,
  Group,
  Item,
  Track,
} from "@/components/layout/AnnouncementBar/AnnouncementBar.styles";

export function AnnouncementBar() {
  const messages = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <Bar role="region" aria-label="Site announcements">
      <Track>
        <Group>
          {messages.map((message, index) => (
            <Item key={`a-${index}`}>{message}</Item>
          ))}
        </Group>
        <Group aria-hidden>
          {messages.map((message, index) => (
            <Item key={`b-${index}`}>{message}</Item>
          ))}
        </Group>
      </Track>
    </Bar>
  );
}
