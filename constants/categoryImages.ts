/** Category lifestyle imagery via Unsplash photo IDs. */
export function unsplashImage(
  photoId: string,
  options?: { w?: number; h?: number; q?: number },
) {
  const w = options?.w ?? 1400;
  const q = options?.q ?? 80;
  const h = options?.h;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
  });
  if (h) params.set("h", String(h));
  return `https://images.unsplash.com/${photoId}?${params.toString()}`;
}

export const CATEGORY_IMAGES = {
  men: unsplashImage("photo-1488161628813-04466f872be2", { w: 1400, h: 1120 }), // menswear lifestyle
  women: unsplashImage("photo-1483985988355-763728e1935b"), // women shopping
  kids: unsplashImage("photo-1503454537195-1dcabb73ffb9"), // kids lifestyle
  accessories: unsplashImage("photo-1553062407-98eeb64c6a62"), // backpack / accessories
  "best-sellers": unsplashImage("photo-1558769132-cb1aea458c5e"), // clothing hangers / retail
  "new-arrivals": unsplashImage("photo-1445205170230-053b83016050"), // boutique fashion
  sale: unsplashImage("photo-1607082348824-0a96f2a4b9da"), // shopping / offers
  bags: unsplashImage("photo-1548036328-c9fa89d128fa"), // bags
  sports: unsplashImage("photo-1517836357463-d25dfeac3438"), // sportswear / training
} as const;
