import type { ComponentProps } from "solid-js";
import type { EditorState } from "@codemirror/state";
import type { createTabList } from "../utils/tabs";

import { javascript } from "@codemirror/lang-javascript";
import { For } from "solid-js";

import { Button } from "./Button";
import { Tab } from "./Tab";

import { createModel } from "../utils/model";

export function TabList(
  props: ComponentProps<"div"> & {
    state?: EditorState;
    tabsListState: ReturnType<typeof createTabList>;
  } 
) {
  const [tabs, { addTab }] = props?.tabsListState;
  return (
    <div class="tab-bar">
      <For each={tabs.list}>
        {(value, index) => (
          <Tab
            name={value.url.toString()}
            index={index()}
            tabsListState={props?.tabsListState}
          />
        )}
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
