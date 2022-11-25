import { javascript } from "@codemirror/lang-javascript";
import type { LanguageSupport } from "@codemirror/language";
import type { ComponentProps } from "solid-js";

import { createContext, For } from "solid-js";
import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";

import { extensions } from "../utils/extensions";
import { Button } from "./Button";
import { Tab } from "./Tab";
import { createModel } from "../utils/model";

import type { EditorState } from "@codemirror/state";
import { useTabList } from "../utils/tabs";

export function TabList(props: ComponentProps<"div"> & { state?: EditorState }) {
  const [tabs, { addTab }] = useTabList();
  return (
    <div class="tab-bar">
      <For each={tabs.list}>
        {(value, index) => {
          return <Tab name={value.url.toString()} index={index()} />;
        }}
      </For>
      <Button
        onClick={() => {
          const model = createModel(
            "Another ",
            javascript({
              jsx: true,
              typescript: true,
            }),
            `./test${tabs.list.length + 1}.ts`
          );
          
          addTab(model);
        }}
      >
        <IconFluentAdd24Filled />
      </Button>
    </div>
  );
}
