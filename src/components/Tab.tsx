import clsx from "clsx";
import type { ComponentProps } from "solid-js";
import type { createTabList } from "../utils/tabs";
import { Button } from "./Button";

export interface TabProps {
  name?: string;
  pinned?: boolean;
  index: number;
  tabsListState: ReturnType<typeof createTabList>;
}

export function Tab(props: ComponentProps<'div'> & TabProps) {
  const [tabs, { setActive, removeTab, setState: setTabState }] = props.tabsListState;
  return (
    <Button
      class={clsx("tab", { active: tabs.active == props.index })}
      onClick={() => {
        setActive(props.index);
      }}
    >
      <div>
        <input
          type="text"
          value={props.name}
          onInput={(e) => setTabState("list", props.index, "url", e.currentTarget.value)}
        />
        <Button
          class="close-tab-btn"
          title="Close"
          onClick={() => {
            removeTab(props.index);
          }}
        >
          <IconFluentDismiss24Filled />
        </Button>
      </div>
    </Button>
  );
}