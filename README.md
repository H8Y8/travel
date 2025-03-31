# 旅遊多用戶分帳網頁 - 專案 README

## 專案概述
本專案旨在開發一個旅遊多用戶分帳網頁應用，幫助旅遊團體中的用戶輕鬆管理、記錄和分擔旅遊費用。核心目標是提供最佳化的使用者體驗（UX）、美觀的介面設計（UI），並確保應用程式能完美響應手機與電腦端。

## 專案結構

```mermaid
graph TD
    A(travel) --> B(README.md);
    A --> C(frontend);
    A --> D(backend);

    subgraph Frontend (Next.js)
    C --> C1(app);
    C --> C2(components);
    C --> C3(public);
    C --> C4(package.json);
    C --> C5(...);
    end

    subgraph Backend (Node.js/Express)
    D --> D1(src);
    D --> D2(package.json);
    D --> D3(.gitignore);
    D --> D4(tsconfig.json);
    D --> D5(...);

    D1 --> D1a(controllers);
    D1 --> D1b(models);
    D1 --> D1c(routes);
    D1 --> D1d(config);
    D1 --> D1e(server.ts);
    D1 --> D1f(...);
    end

    style C fill:#D6EAF8,stroke:#3498DB,stroke-width:2px;
    style D fill:#D5F5E3,stroke:#2ECC71,stroke-width:2px;
```

## 需求

### 功能需求

#### 用戶管理
- 用戶註冊與登入（支援電子郵件或第三方登入，如 Google）。
- 個人資料編輯與管理。

#### 旅遊團管理
- 創建旅遊團並邀請成員加入（透過連結或電子郵件）。
- 顯示團內成員名單與狀態。

#### 費用記錄與分帳
- 添加旅遊相關費用（金額、類別、付款人、描述）。
- 自動計算每人應付/應得金額。
- 支援多幣種轉換（即時匯率）。

#### 結算與通知
- 生成結算報表並分享給團員。
- 發送結算提醒（電子郵件或應用內通知）。

#### 數據可視化
- 提供費用分佈圖表（例如圓餅圖或條形圖）。
- 顯示個人與團體總花費。

### 非功能需求
- **使用者體驗（UX）**：操作直觀，減少點擊次數，流程簡化。
- **介面設計（UI）**：現代化、視覺吸引力的設計，採用一致的配色與字體。
- **響應式設計**：適配手機（iOS/Android）、平板和桌面設備。
- **性能**：頁面載入時間低於 2 秒。
- **安全性**：用戶數據加密，防止未授權訪問。

## 技術棧

### 前端
- **框架**：React.js - 輕量、組件化，適合響應式設計。
- **UI 庫**：Material-UI 或 Tailwind CSS - 提供美觀且可自訂的組件。
- **狀態管理**：Redux 或 Context API - 管理用戶與分帳數據。
- **圖表**：Chart.js - 簡單易用的數據可視化工具。

### 後端
- **框架**：Node.js + Express - 快速搭建 RESTful API。
- **資料庫**：MongoDB - 靈活的 NoSQL 資料庫，適合動態數據。
- **認證**：JWT（JSON Web Token）- 安全用戶認證。

### 其他
- **API**：匯率 API（如 Open Exchange Rates）- 支援多幣種轉換。
- **部署**：Vercel 或 AWS - 簡單部署與擴展。
- **版本控制**：Git + GitHub - 團隊協作與代碼管理。

## 里程碑與進度

*(狀態：進行中)*

### 里程碑 1：專案初始化與設計 (已部分完成)
- **目標**：確定專案架構與設計基礎。
- **任務**：
  - [x] 建立專案 repository（GitHub）。
  - [ ] 完成線框圖（Wireframes）與 UI 設計稿（設計稿連結: [請在此處貼上連結或說明文件位置]）。
  - [x] **設定前端與後端基本框架**：
    - [x] 建立前後端分離資料夾結構 (`frontend/`, `backend/`)。
    - [x] 初始化後端 Node.js (Express + TypeScript) 專案。
    - [x] 安裝後端依賴。
    - [x] 配置 `tsconfig.json`。
    - [x] 建立基本伺服器入口點 (`src/index.ts`) 與 MongoDB 連接。
    - [x] 更新 README 加入專案結構圖。
- **預計完成時間**：第 1-2 週。

### 里程碑 2：核心功能開發 - 用戶管理 (進行中)
- **目標**：實現用戶註冊與登入功能。
- **後續步驟規劃**：
  1.  **建立用戶資料模型 (`backend/src/models/User.ts`)**:
      *   定義 `UserSchema` (包含 `name`, `email`, `password` 等)。
  2.  **建立認證路由 (`backend/src/routes/auth.ts`)**:
      *   定義 `POST /api/auth/register` 和 `POST /api/auth/login` 路由。
  3.  **建立認證控制器 (`backend/src/controllers/authController.ts`)**:
      *   實現註冊邏輯 (資料驗證、密碼雜湊、存入 DB)。
      *   實現登入邏輯 (用戶查找、密碼比對、生成 JWT)。
  4.  **整合路由與環境變數**:
      *   在 `src/index.ts` 中掛載認證路由。
      *   設定 `JWT_SECRET` 等環境變數。
  5.  **前端頁面連接**:
      *   修改註冊/登入頁面以呼叫後端 API。
      *   處理前端 JWT 儲存與登入狀態管理。
- **預計完成時間**：第 3-4 週。

### 里程碑 3：分帳與結算功能
- **目標**：完成費用記錄與分帳邏輯。
- **任務**：
  - 實現費用輸入與自動分帳計算。
  - 整合匯率 API。
  - 開發結算報表與通知功能。
- **預計完成時間**：第 5-6 週。

### 里程碑 4：數據可視化與優化
- **目標**：提升 UX 並添加視覺化功能。
- **任務**：
  - 整合 Chart.js 實現費用圖表。
  - 優化頁面性能與響應速度。
  - 進行初步用戶測試並調整。
- **預計完成時間**：第 7-8 週。

### 里程碑 5：測試與部署
- **目標**：確保應用穩定並上線。
- **任務**：
  - 進行全面測試（功能、響應式、安全性）。
  - 修復 bugs 並完成最終調整。
  - 部署到生產環境（Vercel/AWS）。
- **預計完成時間**：第 9-10 週。
