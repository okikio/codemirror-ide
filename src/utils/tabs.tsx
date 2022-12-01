import { javascript } from "@codemirror/lang-javascript";
import { createStore } from "solid-js/store";
import { createModel, type IModel } from "./model";

export type TabListState = {
  list: IModel[];
  active: number;
};

export type TabListValue = [
  state: Readonly<TabListState>,
  actions: {
    addTab: (model: IModel) => void;
    removeTab: (index: number) => void;
    setActive: (index: number) => void;
  }
];

const defaultState: TabListState = {
  list: [
    createModel(
      "String",
      javascript({
        jsx: true,
        typescript: true,
      }),
      "./test.ts"
    ),
  ],
  active: 0,
};

export function createTabList(props: Partial<TabListState> = {}) {
  const [state, setState] = createStore<TabListState>({
    list: props.list ?? defaultState.list,
    active: props.active ?? defaultState.active,
  });

  const addTab = (model: IModel) => setState("list", [...state.list, model]);
  const removeTab = (index: number) => {
    return setState("list", [
      ...state.list.slice(0, index),
      ...state.list.slice(index + 1),
    ]);
  }
  const setActive = (index: number) => setState("active", index);
  return [state, { addTab, removeTab, setActive, setState }] as const;
}
