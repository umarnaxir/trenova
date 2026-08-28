/** Category lifestyle imagery — local assets first, Unsplash fallbacks for extras. */
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
  men: "/images/category/men.png",
  women: "/images/category/women.png",
  kids: "/images/category/kids.png",
  accessories: "/images/category/accessories.png",
  bags: "/images/category/bags.png",
  sports: "/images/category/sports.png",
  "best-sellers": unsplashImage("photo-1558769132-cb1aea458c5e"),
  "new-arrivals": unsplashImage("photo-1445205170230-053b83016050"),
  sale: unsplashImage("photo-1607082348824-0a96f2a4b9da"),
} as const;
