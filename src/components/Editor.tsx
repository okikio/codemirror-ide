// import type { Props as CodeMirrorProps } from "@solid-codemirror/codemirror";
// import { CodeMirror } from "@solid-codemirror/codemirror";
import { ComponentProps, createEffect, splitProps } from "solid-js";

import type { CodeMirrorProps } from "../utils/codemirror";
import { createCodeMirror } from "../utils/codemirror";

import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

import { TabList } from "./TabList";

import { mergeRefs } from "@solid-primitives/refs";
import { createExtensions, extensions } from "../utils/extensions";
import { createTheme } from "../utils/theme";

import { TabListProvider, useTabList } from "../utils/tabs";

import { githubLight } from "@ddietr/codemirror-themes/github-light";
import { githubDark } from "@ddietr/codemirror-themes/github-dark";

import { StateEffect } from "@codemirror/state";

export function Editor(props: ComponentProps<'div'> & CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;
  const [codemirrorProps, others] = splitProps(props, [
    "value",
    "onValueChange",
    "onEditorMount",
  ]);

  const { createExtension, state, view } = createCodeMirror(
    codemirrorProps,
    () => ref
  );

  createTheme({ theme: githubDark }, createExtension);
  // createExtensions({ extensions: basicSetup }, createExtension);
  // createExtensions({ extensions: extensions() }, createExtension); 

  const [tabs] = useTabList();

  createEffect(() => {
    // const activeTab = tabs.list[tabs.active];
    // state.update({
    //   changes: {
    //     from: 0,
    //     insert: activeTab.state.doc
    //   },
    // });
    // state.
  });

  return (
    <div>
      <TabList state={state} />
      <div ref={mergeRefs((el) => (ref = el), props.ref)} {...others} />

      {/* <CodeMirror
      theme={oneDark}
      extensions={[
        basicSetup,
        extensions(),
        javascript({
          jsx: true,
          typescript: true,
        }),
      ]}
      {...props}
    /> */}
    </div>
  );
}
