import {
  Ornament,
  OrnamentContent,
  OrnamentContents,
  OrnamentTab,
  OrnamentTabs,
} from "@/components/core/ornament";
import { MemoriesToolbar, MemoriesView } from "./memories-view";
import { IconPhotoFilled } from "@tabler/icons-react";
import { PencilRulerIcon, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultWindowProps } from "../constants";
import {
  NavigationBar,
  NavigationBarTitle,
} from "@/components/core/navigation-bar";
import { ButtonGroup } from "@/components/core/button";
import { HeroDropdownMenu } from "@/components/landing/hero-dropdown-menu";

function PhotosPage() {
  return (
    <Ornament defaultTab="memories">
      <OrnamentContents contentClassName={cn("h-[32vw] max-h-[640px]")}>
        <OrnamentContent
          {...defaultWindowProps}
          value="memories"
          key="memories"
          FooterComponent={MemoriesToolbar}
          rootClassName="[--window-controls-bottom:-80px]"
        >
          <MemoriesView />
        </OrnamentContent>
        <OrnamentContent
          value="collections"
          key="collections"
          {...defaultWindowProps}
        >
          <NavigationBar>
            <div />
            <NavigationBarTitle>Collections</NavigationBarTitle>
            <ButtonGroup>
              <HeroDropdownMenu />
            </ButtonGroup>
          </NavigationBar>
          <div className="h-[600px]" />
        </OrnamentContent>
        <OrnamentContent value="spacial" key="spacial" {...defaultWindowProps}>
          <NavigationBar>
            <div />
            <NavigationBarTitle>Spacial</NavigationBarTitle>
            <ButtonGroup>
              <HeroDropdownMenu />
            </ButtonGroup>
          </NavigationBar>
          <div className="h-[600px]" />
        </OrnamentContent>
      </OrnamentContents>
      <OrnamentTabs>
        <OrnamentTab
          icon={<IconPhotoFilled data-slot="icon" />}
          label="Memories"
          value="memories"
        />
        <OrnamentTab
          icon={<PencilRulerIcon className="size-6" data-slot="icon" />}
          label="Collections"
          value="collections"
        />
        <OrnamentTab
          icon={<Settings data-slot="icon" />}
          label="Spacial"
          value="spacial"
        />
      </OrnamentTabs>
    </Ornament>
  );
}

export default PhotosPage;
