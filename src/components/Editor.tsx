// import type { Props as CodeMirrorProps } from "@solid-codemirror/codemirror";
// import { CodeMirror } from "@solid-codemirror/codemirror";
import { type ComponentProps, createEffect, splitProps, createSignal, mergeProps } from "solid-js";

import type { CodeMirrorProps } from "../utils/codemirror";
import { createCodeMirror } from "../utils/codemirror";

import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

import { TabList } from "./TabList";

import { mergeRefs } from "@solid-primitives/refs";
import { createExtensions, extensions, setExtensions } from "../utils/extensions";
import { createTheme } from "../utils/theme";

import { createTabList } from "../utils/tabs";

import { githubLight } from "@ddietr/codemirror-themes/github-light";
import { githubDark } from "@ddietr/codemirror-themes/github-dark";
import { oneDark } from "@codemirror/theme-one-dark";

import { StateEffect } from "@codemirror/state";
import { ChangeSet } from "@codemirror/state";
import { Text } from "@codemirror/state";
import { createStore } from "solid-js/store";

export function Editor(props: ComponentProps<'div'> & CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;
  const [codemirrorProps, others] = splitProps(props, [
    "value",
    "onValueChange",
    "onEditorMount",
  ]);

  const initialValue = codemirrorProps.value;
  const { createExtension, state, view, value, setValue } = createCodeMirror(
    mergeProps(
      {
        onEditorMount() {
          // setValue(initialValue);
        },
        onValueChange(val: string) {
        }
      },
      codemirrorProps
    ),
    () => ref
  );

  createTheme({ theme: githubDark }, createExtension);
  createExtensions({ extensions: basicSetup }, createExtension);
  createExtension(
    javascript({
      jsx: true,
      typescript: true,
    })
  );
  // createExtensions({ extensions: extensions() }, createExtension); 

  const tabsListState = createTabList();
  const [tabs, { addTab }] = tabsListState;

  createEffect(() => {

          const activeTab = tabs.list[tabs.active];
          activeTab.value = state.doc.toString();

          let transaction = state.update({
            changes: { from: 0, insert: activeTab.value, to: state.doc.length },
          });

          // At this point the view still shows the old state.
          if (transaction) {
            console.log(transaction?.state.doc.toString()); // "0123"
            setValue(activeTab.value);
          }
  });

  return (
    <div>
      <TabList state={state} tabsListState={tabsListState} />
      <div ref={mergeRefs((el) => (ref = el), props.ref)} {...others} />
    </div>
  );
}
