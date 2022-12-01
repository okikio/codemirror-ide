import type { LanguageSupport } from "@codemirror/language";
import type { ChangeSpec } from "@codemirror/state";
import { EditorState } from "@codemirror/state";

export interface IModel {
  url: URL | string;
  value: string;
  state: EditorState;
  changes: ChangeSpec;
  lang: LanguageSupport
}

export function createModel(
  value: string,
  lang: LanguageSupport,
  url: URL | string
): IModel {
  const state = EditorState.create({
    doc: value,
    extensions: [lang]
  });
  return {
    url: url.toString(),
    value,
    state,
    changes: [],
    lang
  };
}