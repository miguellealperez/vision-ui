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
import View from "@/components/core/view";

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
              id: "1",
              title: "Personal Information",
            },
            {
              id: "2",
              title: "Sign-in & Security",
            },
            {
              id: "3",
              title: "Payment & Shipping",
            },
            {
              id: "4",
              title: "Subscriptions",
            },
            "",
            {
              id: "5",
              title: "iCloud",
              rightView: "50 GB",
              detail: true,
            },
            {
              id: "6",
              title: "Family",
              rightView: "Set Up",
              detail: true,
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
      leftView={
        <div className="flex justify-center px-4">
          <View className="aspect-square h-8 rounded-full" />
        </div>
      }
      rightView={info.item.rightView}
      {...info}
    />
  );
}
