import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// 定義支援的語系
export const locales = ['en', 'zh-TW'] as const;
export type Locale = (typeof locales)[number];

// 類型斷言確保 locale 是 Locale 類型
export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export default getRequestConfig(async (params: { locale: string }) => {
  const { locale } = params;
  // 驗證語系是否有效
  // 在根佈局中不能使用 notFound()，所以這裡改為返回默認語言
  if (!locale || !isLocale(locale)) {
    return {
      locale: 'en', // 使用默認語言
      messages: (await import(`./messages/en.json`)).default,
      now: new Date()
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    now: new Date()
  };
});
