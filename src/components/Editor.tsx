// import type { Props as CodeMirrorProps } from "@solid-codemirror/codemirror";
// import { CodeMirror } from "@solid-codemirror/codemirror";
import { ComponentProps, splitProps } from "solid-js";

import type { CodeMirrorProps } from "../utils/codemirror";
import { createCodeMirror } from "../utils/codemirror";

import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

import { TabBar } from "./TabBar";

import { mergeRefs } from "@solid-primitives/refs";
import { createExtensions, extensions } from "../utils/extensions";
import { createTheme } from "../utils/theme";

export function Editor(props: ComponentProps<'div'> & CodeMirrorProps) {
  let ref: HTMLDivElement | undefined;
  const [codemirrorProps, others] = splitProps(props, [
    "value",
    "onValueChange",
    "onEditorMount",
  ]);

  const { createExtension, state } = createCodeMirror(
    codemirrorProps,
    () => ref
  );

  createTheme({ theme: oneDark }, createExtension);
  createExtensions({}, createExtension); //  extensions: extensions()

  return (
    <div>
      <TabBar state={state} />
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
