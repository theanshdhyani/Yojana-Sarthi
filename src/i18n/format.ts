import { en, MessageKey, Messages } from './messages/en';

/** A translatable message: a key plus parameters, which may themselves be messages. */
export interface Msg {
  key: MessageKey;
  params?: Record<string, MsgParam>;
}
export type MsgParam = string | number | Msg | Msg[];

export const msg = (key: MessageKey, params?: Record<string, MsgParam>): Msg => ({ key, params });

const renderParam = (dict: Messages, value: MsgParam): string => {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map((v) => renderParam(dict, v)).join(dict.listSeparator ?? ', ');
  return formatMessage(dict, value.key, value.params);
};

/** Fills `{name}` placeholders. Missing translations fall back to English, then to the key itself. */
export function formatMessage(dict: Messages, key: MessageKey, params?: Record<string, MsgParam>): string {
  const template = dict[key] || en[key] || key;
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (whole, name: string) => {
    const value = params[name];
    return value === undefined ? whole : renderParam(dict, value);
  });
}

export const formatMsg = (dict: Messages, m: Msg): string => formatMessage(dict, m.key, m.params);
