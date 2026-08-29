import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    let members = await prisma.teamMember.findMany({
      orderBy: { joinedAt: 'desc' },
    });

    if (members.length === 0) {
      // Seed default initial team member
      const initial = await prisma.teamMember.create({
        data: {
          name: 'Umar Pathan',
          email: 'umar@gmail.com',
          role: 'Admin',
          status: 'active',
          password: '1122',
        },
      });
      members = [initial];
    }

    const safeMembers = members.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      role: m.role,
      status: m.status,
      joinedAt: m.joinedAt.toISOString(),
    }));

    res.status(200).json({ success: true, data: safeMembers });
  } catch (error: any) {
    console.error('getTeamMembers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch team members' });
  }
};

function normalizeRole(role?: string): 'Admin' | 'Editor' {
  if (!role) return 'Editor';
  const upper = String(role).trim().toUpperCase();
  if (upper === 'ADMIN' || upper === 'SUPERADMIN' || upper === 'MANAGER') {
    return 'Admin';
  }
  return 'Editor';
}

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const { name, email, role, password, status } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const existing = await prisma.teamMember.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Team member email already exists' });
    }

    const assignedRole = normalizeRole(role);

    const member = await prisma.teamMember.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: assignedRole,
        status: status || 'active',
        password,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        status: member.status,
        joinedAt: member.joinedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('createTeamMember error:', error);
    res.status(500).json({ success: false, message: 'Failed to create team member' });
  }
};

export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { name, email, role, status, password } = req.body;

    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }

    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.trim().toLowerCase();
    if (role !== undefined) updateData.role = normalizeRole(role);
    if (status) updateData.status = status;
    if (password && password.length >= 4) updateData.password = password;

    const updated = await prisma.teamMember.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      data: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        status: updated.status,
        joinedAt: updated.joinedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('updateTeamMember error:', error);
    res.status(500).json({ success: false, message: 'Failed to update team member' });
  }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await prisma.teamMember.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Team member deleted' });
  } catch (error: any) {
    console.error('deleteTeamMember error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete team member' });
  }
};
