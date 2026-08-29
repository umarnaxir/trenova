import { Router } from 'express';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/adminTeam.controller';
import { adminProtect, requireAdmin } from '../middleware/auth';

const router = Router();

router.use(adminProtect);
router.use(requireAdmin);

router.get('/', getTeamMembers);
router.post('/', createTeamMember);
router.put('/:id', updateTeamMember);
router.delete('/:id', deleteTeamMember);

export default router;
