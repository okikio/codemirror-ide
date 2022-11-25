import type { LanguageSupport } from "@codemirror/language";
import { EditorState, type Text, type Extension } from "@codemirror/state";
import { extensions } from "./extensions";

export interface IModel {
  url: URL | string;
  state: EditorState;
}

export function createModel(
  value: string | Text,
  lang: LanguageSupport,
  url: URL | string
): IModel {
  const state = EditorState.create({
    doc: value,
    extensions: [lang, extensions()] as Extension, // extensions
  });
  return {
    url: url.toString(),
    state,
  };
}