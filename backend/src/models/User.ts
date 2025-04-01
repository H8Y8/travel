import mongoose, { Schema, Document } from 'mongoose';

// 定義 User 文件接口，擴展 Mongoose 的 Document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // 密碼設為可選，因為可能使用第三方登入
  googleId?: string; // 用於 Google 登入
  createdAt: Date;
  updatedAt: Date;
}

// 定義 User Schema
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '請提供姓名'], // 添加驗證訊息
      trim: true,
    },
    email: {
      type: String,
      required: [true, '請提供電子郵件'],
      unique: true, // 確保電子郵件唯一
      lowercase: true, // 轉換為小寫
      trim: true,
      // 基本的 email 格式驗證 (更嚴謹的驗證可在控制器層進行)
      match: [/^\S+@\S+\.\S+$/, '請提供有效的電子郵件地址'],
    },
    password: {
      type: String,
      // 密碼不是必需的，因為可能使用第三方登入
      // required: [true, '請提供密碼'],
      minlength: [6, '密碼長度至少需要 6 個字元'], // 密碼最小長度
      select: false, // 預設查詢時不返回密碼
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // 允許 null 值存在且唯一，適用於非 Google 登入用戶
    },
  },
  {
    // 自動添加 createdAt 和 updatedAt 欄位
    timestamps: true,
  }
);

// 創建並匯出 User 模型
// Mongoose 會自動將 'User' 轉換為小寫複數形式 'users' 作為 collection 名稱
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
