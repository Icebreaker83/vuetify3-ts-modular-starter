import { createI18n } from 'vue-i18n';
import en from './en';
import sr from './sr';

// Ready translated locale messages
const messages = {
  en: en,
  sr: sr,
};

// Error will be displayed in VSCode if translation is missing 'en'
type MessageSchema = typeof sr;

const isProd = import.meta.env.PROD;

const options = {
  locale: 'en', // set locale
  legacy: false,
  missingWarn: !isProd,
  fallbackWarn: !isProd,
  silentTranslationWarn: isProd,
  messages, // set locale messages
};

const i18n = createI18n<[MessageSchema], 'en' | 'sr'>(options);

export default i18n;

export const t = i18n.global.t;
export const te = i18n.global.te;
export const tc = i18n.global.tc;
