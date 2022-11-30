import type { LanguageSupport } from "@codemirror/language";

export interface IModel {
  url: URL | string;
  value: string;
  lang: LanguageSupport
}

export function createModel(
  value: string,
  lang: LanguageSupport,
  url: URL | string
): IModel {
  return {
    url: url.toString(),
    value,
    lang
  };
}