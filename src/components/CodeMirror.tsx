import type { Props as CodeMirrorProps } from "@solid-codemirror/codemirror";
import { CodeMirror } from "@solid-codemirror/codemirror";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export function Codemirror(props: CodeMirrorProps) {
  return (
    <CodeMirror
      theme={oneDark}
      extensions={[
        basicSetup,
        javascript({
          jsx: true,
          typescript: true,
        }),
      ]}
      {...props}
    />
  );
}
