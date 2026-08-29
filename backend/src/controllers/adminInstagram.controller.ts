import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export type InstagramShot = {
  id: string;
  src: string;
  alt: string;
};

const DEFAULT_INSTAGRAM_SHOTS: InstagramShot[] = [
  { id: 'ig-1', src: '/products/instagram-1.jpg', alt: 'Trenova look 1' },
  { id: 'ig-2', src: '/products/instagram-2.jpg', alt: 'Trenova look 2' },
  { id: 'ig-3', src: '/products/instagram-3.jpg', alt: 'Trenova look 3' },
  { id: 'ig-4', src: '/products/instagram-4.jpg', alt: 'Trenova look 4' },
  { id: 'ig-5', src: '/products/instagram-5.jpg', alt: 'Trenova look 5' },
  { id: 'ig-6', src: '/products/instagram-6.jpg', alt: 'Trenova look 6' },
  { id: 'ig-7', src: '/products/collection-layers.jpg', alt: 'Trenova look 7' },
  { id: 'ig-8', src: '/products/collection-women.jpg', alt: 'Trenova look 8' },
  { id: 'ig-9', src: '/products/collection-essentials.jpg', alt: 'Trenova look 9' },
];

const SETTING_KEY = 'instagram_shots';

async function fetchShots(): Promise<InstagramShot[]> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: SETTING_KEY },
    });

    if (setting && Array.isArray(setting.value)) {
      return setting.value as unknown as InstagramShot[];
    }

    // Initialize with default shots
    await prisma.siteSetting.upsert({
      where: { key: SETTING_KEY },
      update: { value: DEFAULT_INSTAGRAM_SHOTS as any },
      create: { key: SETTING_KEY, value: DEFAULT_INSTAGRAM_SHOTS as any },
    });

    return DEFAULT_INSTAGRAM_SHOTS;
  } catch (error) {
    console.error('Error fetching instagram shots:', error);
    return DEFAULT_INSTAGRAM_SHOTS;
  }
}

async function saveShots(shots: InstagramShot[]): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key: SETTING_KEY },
    update: { value: shots as any },
    create: { key: SETTING_KEY, value: shots as any },
  });
}

// GET /api/v1/admin/instagram or public /api/v1/cms/instagram
export const getInstagramShots = async (req: Request, res: Response) => {
  try {
    const shots = await fetchShots();
    res.status(200).json({ success: true, data: shots });
  } catch (error: any) {
    console.error('getInstagramShots error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch Instagram shots' });
  }
};

// POST /api/v1/admin/instagram
export const createInstagramShot = async (req: Request, res: Response) => {
  try {
    const { src, alt } = req.body;
    if (!src) {
      return res.status(400).json({ success: false, message: 'Image URL or source is required' });
    }

    const currentShots = await fetchShots();
    const newShot: InstagramShot = {
      id: `ig-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      src: String(src).trim(),
      alt: alt ? String(alt).trim() : `Trenova look ${currentShots.length + 1}`,
    };

    const nextShots = [...currentShots, newShot];
    await saveShots(nextShots);

    res.status(201).json({ success: true, data: newShot });
  } catch (error: any) {
    console.error('createInstagramShot error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create Instagram shot' });
  }
};

// PUT /api/v1/admin/instagram/:id
export const updateInstagramShot = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { src, alt } = req.body;

    const currentShots = await fetchShots();
    const index = currentShots.findIndex((shot) => shot.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Instagram shot not found' });
    }

    const updatedShot: InstagramShot = {
      ...currentShots[index],
      ...(src !== undefined ? { src: String(src).trim() } : {}),
      ...(alt !== undefined ? { alt: String(alt).trim() } : {}),
    };

    const nextShots = [...currentShots];
    nextShots[index] = updatedShot;
    await saveShots(nextShots);

    res.status(200).json({ success: true, data: updatedShot });
  } catch (error: any) {
    console.error('updateInstagramShot error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update Instagram shot' });
  }
};

// DELETE /api/v1/admin/instagram/:id
export const deleteInstagramShot = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const currentShots = await fetchShots();
    const filtered = currentShots.filter((shot) => shot.id !== id);

    if (filtered.length === currentShots.length) {
      return res.status(404).json({ success: false, message: 'Instagram shot not found' });
    }

    await saveShots(filtered);
    res.status(200).json({ success: true, message: 'Instagram shot deleted successfully' });
  } catch (error: any) {
    console.error('deleteInstagramShot error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to delete Instagram shot' });
  }
};

// PUT /api/v1/admin/instagram (replace / reorder entire list)
export const replaceInstagramShots = async (req: Request, res: Response) => {
  try {
    const { shots } = req.body;
    if (!Array.isArray(shots)) {
      return res.status(400).json({ success: false, message: 'Shots array is required' });
    }

    const sanitized: InstagramShot[] = shots.map((s: any, i: number) => ({
      id: s.id || `ig-${Date.now()}-${i}`,
      src: String(s.src || '').trim(),
      alt: s.alt ? String(s.alt).trim() : `Trenova look ${i + 1}`,
    }));

    await saveShots(sanitized);
    res.status(200).json({ success: true, data: sanitized });
  } catch (error: any) {
    console.error('replaceInstagramShots error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to replace Instagram shots' });
  }
};
