import { javascript } from "@codemirror/lang-javascript";
import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import { createModel, type IModel } from "./model";

export type TabListContextState = {
  list: IModel[];
  active: number;
};

export type TabListContextValue = [
  state: Readonly<TabListContextState>,
  actions: {
    addTab: (model: IModel) => void;
    removeTab: (index: number) => void;
    setActive: (index: number) => void;
  }
];

const defaultState: TabListContextState = {
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

const TabListContext = createContext<TabListContextValue>([
  defaultState,
  {
    addTab: () => undefined,
    removeTab: () => undefined,
    setActive: () => undefined,
  },
]);

export const TabListProvider: ParentComponent<Partial<TabListContextState>> = (props) => {
  const [state, setState] = createStore<TabListContextState>({
    list: props.list ?? defaultState.list,
    active: props.active ?? defaultState.active,
  });

  const addTab = (model: IModel) => setState("list", [...state.list, model]);
  const removeTab = (index: number) => setState("list", [
    ...state.list.slice(0, index), 
    ...state.list.slice(index)
  ]);
  const setActive = (index: number) => setState("active", index);

  return (
    <TabListContext.Provider value={[state, { addTab, removeTab, setActive }]}>
      {props.children}
    </TabListContext.Provider>
  );
};

export const useTabList = () => useContext(TabListContext);
