const NAMED_COLORS: Record<string, string> = {
  black: "#0A0A0A",
  white: "#FFFFFF",
  ivory: "#FFFFF0",
  cream: "#FFFDD0",
  beige: "#F5F5DC",
  gray: "#808080",
  grey: "#808080",
  silver: "#C0C0C0",
  charcoal: "#36454F",
  navy: "#001F3F",
  blue: "#2563EB",
  sky: "#87CEEB",
  teal: "#0D9488",
  turquoise: "#40E0D0",
  cyan: "#06B6D4",
  green: "#16A34A",
  olive: "#808000",
  mint: "#98FF98",
  lime: "#84CC16",
  yellow: "#EAB308",
  gold: "#C6A75E",
  orange: "#F97316",
  coral: "#FF7F50",
  peach: "#FFCBA4",
  red: "#DC2626",
  maroon: "#800000",
  burgundy: "#800020",
  pink: "#EC4899",
  rose: "#F43F5E",
  magenta: "#D946EF",
  purple: "#7C3AED",
  violet: "#8B5CF6",
  lavender: "#E6E6FA",
  brown: "#92400E",
  tan: "#D2B48C",
  khaki: "#C3B091",
  mustard: "#E1AD01",
};

/** Normalize to #RRGGBB for `<input type="color">`. */
export function toColorInputValue(hex: string, fallback = "#0A0A0A"): string {
  const cleaned = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) return `#${cleaned.toUpperCase()}`;
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    const expanded = cleaned
      .split("")
      .map((char) => char + char)
      .join("");
    return `#${expanded.toUpperCase()}`;
  }
  return fallback;
}

/** Resolve a typed color name (e.g. "green") to a hex code. */
export function hexFromColorName(name: string): string | null {
  const key = name.trim().toLowerCase().replace(/[\s_-]+/g, " ");
  if (!key) return null;
  if (NAMED_COLORS[key]) return NAMED_COLORS[key];

  // Support compounds like "light blue", "dark green"
  const compact = key.replace(/\s+/g, "");
  if (NAMED_COLORS[compact]) return NAMED_COLORS[compact];

  const words = key.split(" ");
  const last = words[words.length - 1];
  if (last && NAMED_COLORS[last]) return NAMED_COLORS[last];

  return null;
}

export function isValidHex(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());
}
