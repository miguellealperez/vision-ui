import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../core/sidebar";
import View from "../core/view";
import {
  ListDataItem,
  ListItem,
  ListRenderItemProps,
  ListSectionHeader,
} from "../core/list";

import {
  AppStoreIcon,
  CogIcon,
  EnvironmentsIcon,
  PeopleIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  IconBellRingingFilled,
  IconHourglassHigh,
  IconMoonFilled,
} from "@tabler/icons-react";
import { NavigationBar, NavigationBarTitle } from "../core/navigation-bar";

const section_1 = [
  {
    title: "General",
    url: "#",
    icon: CogIcon,
    gradient: "from-gray-400 to-gray-600",
  },
  {
    title: "Apps",
    url: "#",
    icon: AppStoreIcon,
    gradient: "from-sky-500 to-blue-700",
  },
  {
    title: "People",
    url: "#",
    icon: PeopleIcon,
    gradient: "from-green-400 to-green-600",
  },
  {
    title: "Environments",
    url: "#",
    icon: EnvironmentsIcon,
    gradient: "from-indigo-400 to-indigo-800",
  },
];

const section_2 = [
  {
    title: "Notifications",
    url: "#",
    icon: IconBellRingingFilled,
    gradient: "from-rose-400 to-red-600",
  },
  {
    title: "Focus",
    href: "#",
    icon: IconMoonFilled,
    gradient: "from-indigo-400 to-indigo-800",
  },
  {
    title: "Screen Time",
    href: "#",
    icon: IconHourglassHigh,
    gradient: "from-indigo-400 to-indigo-800",
  },
];

function SettingsView() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarInput placeholder="Search" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {section_1.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="gap-4 [&_[data-slot='icon']]:opacity-75">
                      <item.icon data-slot="icon" />
                      <span
                        className={cn(
                          "absolute left-3.5 top-2 z-[-1] size-8 rounded-full",
                          "bg-gradient-to-b",
                          item.gradient,
                        )}
                      />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="pt-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {section_2.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="gap-4 [&_[data-slot='icon']]:opacity-75">
                      <item.icon data-slot="icon" />
                      <span
                        className={cn(
                          "absolute left-3.5 top-2 z-[-1] size-8 rounded-full",
                          "bg-gradient-to-b",
                          item.gradient,
                        )}
                      />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className={cn("relative flex-1")}>
        <NavigationBar size="sm" className="sticky rounded-l-none px-3.5">
          <SidebarTrigger />
          <NavigationBarTitle variant="center">Settings</NavigationBarTitle>
        </NavigationBar>
        <div className="relative my-4 h-[200px] bg-red-500/20">
          Main Content
        </div>
        <div className="relative my-4 h-[200px] bg-red-500/20">
          Main Content
        </div>
        <div className="relative my-4 h-[200px] bg-red-500/20">
          Main Content
        </div>
        <div className="relative my-4 h-[200px] bg-red-500/20">
          Main Content
        </div>
      </main>
    </SidebarProvider>
  );
  /*  return (
    <>
      <div className="flex h-full w-full flex-1">
        <Sidebar
          header={
            <SidebarHeader>
              <Input placeholder="Search" />
            </SidebarHeader>
          }
        >
          <div className="mb-8">
            <ListScreen />
          </div>
        </Sidebar>
        <div className="relative flex-1">
          <NavigationBar>
            <NavigationBarTitle variant="center">Account</NavigationBarTitle>
          </NavigationBar>
          <div className="mt-24 flex flex-col items-center gap-2">
            <View className="size-24 rounded-full md:size-32" />
            <Text size="title1">John Doe</Text>
            <Text variant="tertiary" size="caption1">
              john.doe@example.com
            </Text>
          </div>
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
        </div>
      </div>
    </>
  ); */
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

export default SettingsView;
