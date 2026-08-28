import {
  getInstagramShots,
  type InstagramShot,
} from "@/services/mock/catalogStore";

export type { InstagramShot };

export async function getHomeInstagramShots(): Promise<InstagramShot[]> {
  return getInstagramShots().map((shot) => ({ ...shot }));
}
