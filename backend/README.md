# 旅遊應用後端

這是一個使用 Node.js、Express 和 TypeScript 構建的旅遊應用後端 API。

## 技術棧

- Node.js
- Express
- TypeScript
- MongoDB 與 Mongoose
- JWT 身份驗證
- PNPM 套件管理器

## 安裝

```bash
# 切換到專案目錄
cd backend

# 安裝依賴
pnpm install
```

## 環境變數

創建一個 `.env` 文件，並配置以下變數：

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/travel_app
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 開發

```bash
# 啟動開發伺服器
pnpm dev
```

## 生產構建

```bash
# 構建專案
pnpm build

# 啟動生產伺服器
pnpm start
```

## 專案結構

```
backend/
├── src/
│   ├── config/     - 配置檔案
│   ├── controllers/ - 控制器
│   ├── models/     - 資料模型
│   ├── routes/     - API 路由
│   ├── utils/      - 工具函數
│   └── index.ts    - 應用入口
├── .env           - 環境變數
├── tsconfig.json  - TypeScript 配置
└── package.json   - 專案配置和腳本
``` 