import { javascript } from "@codemirror/lang-javascript";
import type { LanguageSupport } from "@codemirror/language";
import { EditorState, Extension, Text } from "@codemirror/state";

import { ComponentProps, For } from "solid-js";
import { createSignal } from "solid-js";
import { Button } from "./Button";
import { Tab } from "./Tab";

export interface IModel {
  url: URL | string;
  state: EditorState;
}

export function createModel(value: string | Text, lang: LanguageSupport, url: URL | string, extensions?: Extension[] | Extension) {
  const state = EditorState.create({
    doc: value,
    extensions: [lang] as Extension, // extensions
  });
  return {
    url: url.toString(),
    state
  }
}

export function TabBar(props: ComponentProps<"div"> & { state?: EditorState}) {
  const model = createModel(
    "String",
    javascript({
      jsx: true,
      typescript: true,
    }),
    "./test.ts"
  );
  const [tabs, setTabs] = createSignal([model]);
  return (
    <div>
      <For each={tabs()}>{(value) => <Tab name={value.url} />}</For>
      <Button
        onClick={() => {
          const tabList = tabs();
          const model = createModel(
            "Another ",
            javascript({
              jsx: true,
              typescript: true,
            }),
            `./test${tabList.length + 1}.ts`
          );
          setTabs([...tabList, model]);
        }}
      >
        New Tabs
        {/* <Icons name="fluent:add-24-filled" /> */}
        <IconFluentAdd24Filled />
      </Button>
    </div>
  );
}
