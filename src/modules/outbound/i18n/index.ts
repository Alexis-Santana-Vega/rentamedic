import { outboundEn } from './OutboundEn';
import { outboundEs } from './OutboundEs';

export type { OutboundI18nSchema } from './OutboundEs';
export const outboundI18nSchema = {
  es: outboundEs,
  en: outboundEn,
};
