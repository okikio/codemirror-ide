import type { ComponentProps } from "solid-js";
import { TabListProvider } from "../utils/tabs";
import { Editor } from "./Editor";

export function Panel(props?: ComponentProps<'div'>) {
  return (
    <div class="panel">
      <TabListProvider>
        <Editor value={`const x = "Hello There";\nconsole.log(x)`} />
      </TabListProvider>
    </div>
  );
}