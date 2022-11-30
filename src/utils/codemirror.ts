import { type Accessor, onCleanup, onMount, on, createEffect, createSignal } from "solid-js";
import { EditorView } from "@codemirror/view";
import {
  Compartment,
  EditorState,
  StateEffect,
  type Extension,
} from "@codemirror/state";
import { extensions, setExtensions } from "./extensions";

export interface CodeMirrorProps {
  /**
   * The initial value of the editor.
   */
  value?: string;
  /**
   * Called whenever the editor code value changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * Called when the editor first mounts, receiving the current EditorView instance.
   */
  onEditorMount?: (editor: EditorView) => void;
}

/**
 * Creates a CodeMirror editor view instance (the editor's user interface).
 * @param props See {@link CodeMirrorProps} for details.
 * @param ref the element to attach the editor to on creation.
 */
export function createCodeMirror(
  props: CodeMirrorProps,
  ref: Accessor<HTMLDivElement | undefined>
) {
  let view: EditorView | undefined;
  const state = EditorState.create({
    doc: props.value,
  });

  const [value, setValue] = createSignal(props.value);

  onMount(() => {
    // Construct a new EditorView instance
    view = new EditorView({
      state,
      parent: ref(),
      dispatch: (tr): void => {
        if (!view) return;

        view.update([tr]);

        if (tr.docChanged) {
          const newCode = tr.newDoc.sliceString(0, tr.newDoc.length);
          props.onValueChange?.(newCode);
        }
      },
    });

    props.onEditorMount?.(view);

    onCleanup(() => {
      if (!view) return;
      view.destroy();
    });
  });

  createEffect(
    on(
      value,
      (val) => {
        if (!view || val === view.state.doc.toString()) {
          return;
        }
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: val,
          },
        });
      },
      { defer: true }
    )
  );

  /**
   * Creates a compartment instance with the given extension and appends it to the top-level configuration of the editor.
   * See {@link https://codemirror.net/examples/config/| CodeMirror Configuration} and {@link https://codemirror.net/docs/ref/#state.Compartment| Compartment} for details on editor configuration.
   * @param extension the extension to append
   */
  function createExtension(extension: Extension) {
    const compartment = new Compartment();
  
    setExtensions([extensions(), compartment].flat() as Extension)

    onMount(() => {
      if (!view) return;

      view.dispatch({
        effects: StateEffect.appendConfig.of(compartment.of(extension)),
      });
    });

    /**
     * Reconfigures the extension compartment with the given extension.
     * @param extension the extension to reconfigure the extension compartment with.
     */
    function reconfigure(extension: Extension) {
      if (!view) return;

      view.dispatch({
        effects: compartment.reconfigure(extension),
      });
    }

    return { compartment, reconfigure };
  }

  return { createExtension, view, state, value, setValue };
}