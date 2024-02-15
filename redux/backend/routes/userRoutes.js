import express from 'express';
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile,adminHome } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/auth',authUser);
router.post('/',registerUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/admin',adminHome);

export default router;