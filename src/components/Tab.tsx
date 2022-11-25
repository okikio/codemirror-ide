import type { ComponentProps, Setter } from "solid-js";
import { useTabList } from "../utils/tabs";
import { Button } from "./Button";

export interface TabProps {
  name?: string;
  pinned?: boolean;
  index: number;
}

export function Tab(props: ComponentProps<'div'> & TabProps) {
  const [, { setActive, removeTab }] = useTabList();
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