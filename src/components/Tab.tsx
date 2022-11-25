import type { ComponentProps } from "solid-js";
import { Button } from "./Button";

export interface TabProps {
  name?: string;
  pinned?: boolean
}

export function Tab(props: ComponentProps<'div'> & TabProps) {
  return (
    <div>
      {props.name} 
      <Button>
        Close
      </Button>
    </div>
    );
}