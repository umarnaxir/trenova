import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// GET /api/v1/admin/cms — list all CMS pages
export const listCmsPages = async (req: Request, res: Response) => {
  try {
    const pages = await prisma.cmsPage.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    res.status(200).json({ success: true, data: pages });
  } catch (error: any) {
    console.error('List CMS Pages Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch CMS pages' });
  }
};

// POST /api/v1/admin/cms — create a new CMS page
export const createCmsPage = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, status } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const generatedSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existing = await prisma.cmsPage.findUnique({ where: { slug: generatedSlug } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A page with this slug already exists' });
    }

    const page = await prisma.cmsPage.create({
      data: {
        title,
        slug: generatedSlug,
        content: content || '',
        status: status === 'published' ? 'published' : 'draft'
      }
    });

    res.status(201).json({ success: true, data: page });
  } catch (error: any) {
    console.error('Create CMS Page Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create CMS page' });
  }
};

// GET /api/v1/admin/cms/:id — get page details
export const getCmsPage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const page = await prisma.cmsPage.findUnique({ where: { id } });
    if (!page) {
      return res.status(404).json({ success: false, message: 'CMS Page not found' });
    }
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch CMS page' });
  }
};

// PUT /api/v1/admin/cms/:id — update CMS page
export const updateCmsPage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, slug, content, status } = req.body;

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (slug !== undefined) dataToUpdate.slug = slug;
    if (content !== undefined) dataToUpdate.content = content;
    if (status !== undefined) dataToUpdate.status = status;

    const updated = await prisma.cmsPage.update({
      where: { id },
      data: dataToUpdate
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Update CMS Page Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update CMS page' });
  }
};

// DELETE /api/v1/admin/cms/:id — delete CMS page
export const deleteCmsPage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.cmsPage.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'CMS Page deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete CMS page' });
  }
};

// Public GET /api/v1/cms/:slug — get published CMS page for storefront
export const getPublicCmsPage = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const page = await prisma.cmsPage.findFirst({
      where: { slug, status: 'published' }
    });
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch CMS page' });
  }
};
