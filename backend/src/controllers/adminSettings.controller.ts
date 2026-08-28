import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// GET /api/v1/admin/settings — get all settings
export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    res.status(200).json({ success: true, data: settingsMap });
  } catch (error: any) {
    console.error('Get Settings Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
};

// PUT /api/v1/admin/settings — update key/value setting pairs
export const updateSettings = async (req: Request, res: Response) => {
  try {
    const updates: Record<string, any> = req.body;
    
    for (const [key, value] of Object.entries(updates)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }

    res.status(200).json({ success: true, message: 'Settings updated successfully' });
  } catch (error: any) {
    console.error('Update Settings Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
};

// Public GET /api/v1/settings/:key — get single site setting (e.g. announcement_bar, hero_banner)
export const getPublicSetting = async (req: Request, res: Response) => {
  try {
    const key = req.params.key as string;
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    res.status(200).json({ success: true, data: setting ? setting.value : null });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch setting' });
  }
};
