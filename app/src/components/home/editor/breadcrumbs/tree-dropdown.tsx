import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TreeDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const TreeDropdown: React.FC<TreeDropdownProps> = ({
  open,
  onOpenChange,
  trigger,
  children,
}) => (
  <DropdownMenu open={open} onOpenChange={onOpenChange}>
    <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      className="w-[17.5rem] max-h-80 rounded-md bg-ctp-mantle/75 backdrop-blur-md border border-ctp-surface0/60 shadow-2xl shadow-black/60 py-1.5 overflow-y-auto overflow-x-hidden p-0"
    >
      {children}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default TreeDropdown;
