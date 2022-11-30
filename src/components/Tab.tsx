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
  const [, { setActive, removeTab }] = props.tabsListState;
  return (
    <Button class="tab" onClick={() => {
      setActive(props.index);
    }}>
     
      <input type="text" value={props.name} />
      <Button 
        title="Close"
        onClick={() => {
          removeTab(props.index)
        }}
      >
        <IconFluentDismiss24Filled />
      </Button>
    </Button>
    );
}