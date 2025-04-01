import { Request, Response, NextFunction, RequestHandler } from 'express';

// 定義異步函數的類型
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * 包裝異步路由處理器，捕獲錯誤並傳遞給 next()
 * @param fn - 要包裝的異步控制器函數
 * @returns Express RequestHandler
 */
const asyncHandler = (fn: AsyncFunction): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 確保異步函數中的任何錯誤都被捕獲並傳遞給 Express 的錯誤處理
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
