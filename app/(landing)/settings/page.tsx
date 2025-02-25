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
              detail: true,
            },
            "section1",
            {
              id: "autofill",
              title: "AutoFill & Passwords",
              detail: true,
            },
            {
              id: "dictionary",
              title: "Dictionary",
              detail: true,
            },
            {
              id: "fonts",
              title: "Fonts",
              detail: true,
            },
            {
              id: "keyboard",
              title: "Keyboard",
              detail: true,
            },
            {
              id: "language-region",
              title: "Language & Region",
              detail: true,
            },
            "section2",
            {
              id: "vpns",
              title: "VPN & Device Management",
              detail: true,
            },
            "section3",
            {
              id: "remote-devices",
              title: "Remote Devices",
              detail: true,
            },
            "section4",
            {
              id: "transfer-or-reset",
              title: "Transfer or Reset Vision Pro",
              detail: true,
            },
          ]}
          renderItem={renderItem}
          sectionHeaderAsGap
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
