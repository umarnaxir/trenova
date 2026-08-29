import {
  getInstagramShots,
  type InstagramShot,
} from "@/services/mock/catalogStore";
import { API_URL } from "@/lib/api";

export type { InstagramShot };

export async function getHomeInstagramShots(): Promise<InstagramShot[]> {
  try {
    const res = await fetch(`${API_URL}/cms/instagram`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // fallback to catalogStore below
  }
  return getInstagramShots().map((shot) => ({ ...shot }));
}
