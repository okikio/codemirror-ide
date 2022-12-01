// import type { Props as CodeMirrorProps } from "@solid-codemirror/codemirror";
// import { CodeMirror } from "@solid-codemirror/codemirror";
import {
  type ComponentProps,
  createEffect,
  splitProps,
  createSignal,
  mergeProps,
  on,
} from "solid-js";

import type { CodeMirrorProps } from "../utils/codemirror";
import { createCodeMirror } from "../utils/codemirror";

import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

import { TabList } from "./TabList";

import { mergeRefs } from "@solid-primitives/refs";

import { createTabList } from "../utils/tabs";

import { githubLight } from "@ddietr/codemirror-themes/github-light";
import { githubDark } from "@ddietr/codemirror-themes/github-dark";
import { oneDark } from "@codemirror/theme-one-dark";

import { StateEffect } from "@codemirror/state";
import { ChangeSet } from "@codemirror/state";
import { Text } from "@codemirror/state";
import { createStore } from "solid-js/store";

export function Editor(props: ComponentProps<"div"> & CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;
  const [codemirrorProps, others] = splitProps(props, [
    "value",
    "onValueChange",
    "onEditorMount",
  ]);

  const tabsListState = createTabList();
  const [tabs, { setState: setTabState }] = tabsListState;

  const initialValue = codemirrorProps.value;
  const { createExtension, getState, getView, setValue } = createCodeMirror(
    mergeProps(
      {
        onValueChange(value) {
          const activeTab = tabs.list[tabs.active];
          setTabState(
            "list",
            tabs.active,
            "changes",
            activeTab.state.changes(getState().changes())
          );
          console.log(activeTab.changes);
          // getState().update(activeTab.state.update({
          //   changes: {
          //     from: 0,
          //     insert: value,
          //   },
          // })
          // );
        },
      } as CodeMirrorProps,
      codemirrorProps
    ),
    () => ref
  );

  const theme = createExtension(githubDark);
  const basic = createExtension(basicSetup);
  const lang = createExtension(
    javascript({
      jsx: true,
      typescript: true,
    })
  );

  createEffect(
    on(
      () => tabs.active,
      () => {
        const view = getView();
        if (!view) return;

        const activeTab = tabs.list[tabs.active];
        // createExtensions({ extensions: extensions() }, createExtension);

        // setValue(activeTab.state.doc.toString());
        view.setState(activeTab.state);

        // theme.reconfigure(githubDark);
        // basic.reconfigure(basicSetup);
        // lang.reconfigure(activeTab.lang);

        console.log(activeTab.changes);
        view.dispatch({
          changes: activeTab.changes,
          effects: [
            StateEffect.appendConfig.of(theme.compartment.of(githubDark)),
            StateEffect.appendConfig.of(basic.compartment.of(basicSetup)),
            StateEffect.appendConfig.of(lang.compartment.of(activeTab.lang)),
          ],
        });
        
        console.log({
          state: activeTab.state,
        });
      }
    )
  );

  return (
    <div>
      <TabList state={getState()} tabsListState={tabsListState} />
      <div ref={mergeRefs((el) => (ref = el), props.ref)} {...others} />
    </div>
  );
}
