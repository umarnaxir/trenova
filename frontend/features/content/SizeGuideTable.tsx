"use client";

import { useMemo, useState } from "react";
import {
  TabButton,
  TabRow,
  Table,
  TableWrap,
} from "@/features/content/ContentPage.styles";
import { Text } from "@/components/Text/Text";

type SizeRow = {
  size: string;
  chest: string;
  waist: string;
  hip: string;
};

const charts: Record<"men" | "women" | "kids", SizeRow[]> = {
  men: [
    { size: "XS", chest: "34–36", waist: "28–30", hip: "34–36" },
    { size: "S", chest: "36–38", waist: "30–32", hip: "36–38" },
    { size: "M", chest: "38–40", waist: "32–34", hip: "38–40" },
    { size: "L", chest: "40–42", waist: "34–36", hip: "40–42" },
    { size: "XL", chest: "42–44", waist: "36–38", hip: "42–44" },
    { size: "XXL", chest: "44–46", waist: "38–40", hip: "44–46" },
  ],
  women: [
    { size: "XS", chest: "30–32", waist: "24–26", hip: "34–36" },
    { size: "S", chest: "32–34", waist: "26–28", hip: "36–38" },
    { size: "M", chest: "34–36", waist: "28–30", hip: "38–40" },
    { size: "L", chest: "36–38", waist: "30–32", hip: "40–42" },
    { size: "XL", chest: "38–40", waist: "32–34", hip: "42–44" },
    { size: "XXL", chest: "40–42", waist: "34–36", hip: "44–46" },
  ],
  kids: [
    { size: "4–5Y", chest: "22–23", waist: "20–21", hip: "23–24" },
    { size: "6–7Y", chest: "24–25", waist: "21–22", hip: "25–26" },
    { size: "8–9Y", chest: "26–27", waist: "22–23", hip: "27–28" },
    { size: "10–11Y", chest: "28–29", waist: "23–24", hip: "29–30" },
    { size: "12–13Y", chest: "30–31", waist: "24–25", hip: "31–32" },
  ],
};

export function SizeGuideTable() {
  const [tab, setTab] = useState<"men" | "women" | "kids">("men");
  const rows = useMemo(() => charts[tab], [tab]);

  return (
    <div>
      <TabRow role="tablist" aria-label="Size guide category">
        {(
          [
            ["men", "Men"],
            ["women", "Women"],
            ["kids", "Kids"],
          ] as const
        ).map(([key, label]) => (
          <TabButton
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            $active={tab === key}
            onClick={() => setTab(key)}
          >
            {label}
          </TabButton>
        ))}
      </TabRow>
      <Text color="gray600" mb={4}>
        Measurements in inches. If you are between sizes, we recommend sizing
        up for a relaxed Trenova fit.
      </Text>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest</th>
              <th>Waist</th>
              <th>Hip</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.size}>
                <td>{row.size}</td>
                <td>{row.chest}</td>
                <td>{row.waist}</td>
                <td>{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </div>
  );
}
