import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// 載入環境變數
dotenv.config();

// 建立 Express 應用
const app = express();

// 中間件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 設定伺服器 PORT
const PORT = process.env.PORT || 5000;

// 簡單的路由測試
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '歡迎使用旅遊應用後端 API' });
});

// 連接到 MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/travel_app';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('已成功連接到 MongoDB');
    // 啟動伺服器
    app.listen(PORT, () => {
      console.log(`伺服器正在運行，端口號: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB 連接失敗:', error.message);
    process.exit(1);
  }); 