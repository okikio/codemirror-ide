import type { Compartment, Extension } from "@codemirror/state";
import { createEffect, mergeProps, on } from "solid-js";

export interface ThemeProps {
  /**
   * The CodeMirror theme extension to use
   */
  theme?: Extension;
}

export function createTheme(
  props: ThemeProps,
  createExtension: (extension: Extension) => {
    compartment: Compartment;
    reconfigure: (extension: Extension) => void;
  }
) {
  const merged = mergeProps({ theme: [] }, props);
  const { reconfigure } = createExtension(merged.theme);

  createEffect(
    on(
      () => merged.theme,
      (theme) => {
        reconfigure(theme);
      },
      { defer: true }
    )
  );
}