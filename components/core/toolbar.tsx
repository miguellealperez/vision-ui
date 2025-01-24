import { Window, WindowProps } from "./window";
import { cn } from "@/lib/utils";
import { ButtonGroup } from "../core/button";

export interface ToolbarProps extends WindowProps {}

const Toolbar = ({ className, children, ...props }: ToolbarProps) => {
  return (
    <Window
      className={cn("-mb-[34px]", className)}
      layoutId="toolbar"
      thickness="thin"
      {...props}
    >
      <ButtonGroup>{children}</ButtonGroup>
    </Window>
  );
};
export { Toolbar };
