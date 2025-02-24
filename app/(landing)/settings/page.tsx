import {
  List,
  ListItem,
  ListRenderItemProps,
  ListSectionHeader,
  ListDataItem,
} from "@/components/core/list";
import {
  NavigationBar,
  NavigationBarTitle,
} from "@/components/core/navigation-bar";
import { SidebarTrigger } from "@/components/core/sidebar";

export const dynamic = "force-dynamic";

export default function Settings() {
  //* Artifical delay
  // await new Promise((resolve) => setTimeout(resolve, 600));
  return (
    <>
      <NavigationBar size="sm" className="sticky rounded-tl-none px-3.5">
        <SidebarTrigger />
        <NavigationBarTitle variant="center">Settings</NavigationBarTitle>
      </NavigationBar>
      <div className="mx-auto my-8 w-full max-w-xl">
        <List
          data={[
            {
              id: "about",
              title: "About",
            },
            "",
            {
              id: "autofill",
              title: "AutoFill & Passwords",
            },
            {
              id: "dictionary",
              title: "Dictionary",
            },
            {
              id: "fonts",
              title: "Fonts",
            },
            {
              id: "keyboard",
              title: "Keyboard",
            },
            {
              id: "language-region",
              title: "Language & Region",
            },
            "",
            {
              id: "vpns",
              title: "VPN & Device Management",
            },
            "",
            {
              id: "remote-devices",
              title: "Remote Devices",
            },
            "",
            {
              id: "transfer-or-reset",
              title: "Transfer or Reset Vision Pro",
            },
          ]}
          renderItem={renderItem}
          variant="insets"
        />
      </div>
    </>
  );
}

function renderItem<T extends ListDataItem>(info: ListRenderItemProps<T>) {
  if (typeof info.item === "string") {
    return <ListSectionHeader {...info} />;
  }
  return (
    <ListItem
      leftView={info.item.leftView}
      rightView={info.item.rightView}
      {...info}
    />
  );
}
