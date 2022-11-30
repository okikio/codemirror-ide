import type { ComponentProps } from "solid-js";
import { Editor } from "./Editor";

export function Panel(props?: ComponentProps<'div'>) {
  return (
    <div class="panel">
      <Editor value={`const x = "Hello There";\nconsole.log(x)`} />
    </div>
  );
}