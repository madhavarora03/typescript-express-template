import { registerUser, validateEmail, validateUsername } from '@/controllers';
import { Router } from 'express';

const router = Router();

router.route('/validate-email').post(validateEmail);
router.route('/validate-username').post(validateUsername);
router.route('/register').post(registerUser);

export default router;
