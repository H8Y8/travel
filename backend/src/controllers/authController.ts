import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; // 導入 User 模型和 IUser 接口
import dotenv from 'dotenv';

// 加載環境變數 (確保 JWT_SECRET 可用)
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('錯誤：缺少 JWT_SECRET 環境變數。請在 .env 文件中定義它。');
  process.exit(1); // 如果缺少密鑰，則退出應用程式
}

/**
 * @desc    註冊新用戶
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // 1. 檢查用戶是否已存在
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: '此電子郵件已被註冊' });
    }

    // 2. 驗證輸入 (基本驗證，更複雜的可使用 Joi 或 express-validator)
    if (!name || !email || !password) {
      return res.status(400).json({ message: '請提供所有必填欄位 (姓名, 電子郵件, 密碼)' });
    }
    // 可以在這裡添加更詳細的驗證邏輯，例如密碼強度

    // 3. 創建新用戶實例
    user = new User({
      name,
      email,
      password,
    });

    // 4. 密碼雜湊
    const salt = await bcrypt.genSalt(10); // 生成鹽值
    user.password = await bcrypt.hash(password, salt); // 雜湊密碼

    // 5. 保存用戶到資料庫
    await user.save();

    // 6. 生成 JWT Token
    const payload = {
      user: {
        id: user.id, // 使用 Mongoose 自動生成的 id
        // 可以添加其他需要的 payload 信息，例如 name
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET!, // 使用 ! 斷言 JWT_SECRET 已在啟動時檢查過
      { expiresIn: '1h' }, // Token 有效期 (例如 1 小時)
      (err, token) => {
        if (err) throw err;
        // 註冊成功，返回 token (通常註冊後會自動登入)
        res.status(201).json({ token });
      }
    );

  } catch (error) {
    console.error('註冊錯誤:', error);
    // 處理 Mongoose 驗證錯誤
    if (error instanceof Error && error.name === 'ValidationError') {
        // 從錯誤中提取更友好的訊息
        const messages = Object.values((error as any).errors).map((el: any) => el.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: '伺服器錯誤，註冊失敗' });
  }
};

/**
 * @desc    用戶登入
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 1. 檢查輸入
    if (!email || !password) {
      return res.status(400).json({ message: '請提供電子郵件和密碼' });
    }

    // 2. 查找用戶 (需要明確選擇密碼欄位，因為 schema 中設為 select: false)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: '無效的登入憑證' }); // 不要明確指出是郵件還是密碼錯誤
    }

    // 3. 檢查用戶是否有密碼 (可能為第三方登入用戶)
    if (!user.password) {
        return res.status(400).json({ message: '此帳戶可能使用第三方登入，請嘗試其他登入方式' });
    }

    // 4. 比較密碼
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '無效的登入憑證' });
    }

    // 5. 生成 JWT Token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET!,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        // 登入成功，返回 token
        res.status(200).json({ token });
      }
    );

  } catch (error) {
    console.error('登入錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤，登入失敗' });
  }
};

// 可以添加其他控制器函數，例如處理 Google 登入回調、獲取用戶資料等
