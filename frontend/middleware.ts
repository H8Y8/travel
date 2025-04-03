import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // 支援的語系
  locales: locales,
  // 預設語系
  defaultLocale: 'en',
  // 語系前綴設定 (false 表示不使用前綴)
  localePrefix: 'always' // Changed from 'as-needed'
});

export const config = {
  // 匹配所有非靜態檔案和非API路由
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
