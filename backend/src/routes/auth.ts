import express, { Router } from 'express';
// 從控制器導入處理函數
import { registerUser, loginUser } from '../controllers/authController';
// 導入異步處理輔助函數
import asyncHandler from '../utils/asyncHandler';

const router: Router = express.Router();

// @route   POST api/auth/register
// @desc    註冊新用戶
// @access  Public
router.post('/register', asyncHandler(registerUser));

// @route   POST api/auth/login
// @desc    用戶登入並獲取 token
// @access  Public
router.post('/login', asyncHandler(loginUser));

// 可能會添加其他認證相關路由，例如：
// router.get('/me', authMiddleware, getUserProfile); // 獲取用戶資料
// router.post('/logout', authMiddleware, logoutUser); // 登出

export default router;
