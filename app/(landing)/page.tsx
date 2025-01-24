import {
  Ornament,
  OrnamentContentBase,
  OrnamentContents,
  OrnamentTab,
  OrnamentTabs,
} from "@/components/core/ornament";
import { AppStoreIcon, EnvironmentsIcon, PeopleIcon } from "@/components/icons";
import HomeView from "@/components/landing/home-view";
import { Text } from "@/components/ui/typography";

export const dynamic = "force-dynamic";

function LandingPage() {
  return (
    <Ornament defaultTab="apps">
      <OrnamentContents>
        <OrnamentContentBase value="apps" key="apps">
          <HomeView />
        </OrnamentContentBase>
        <OrnamentContentBase value="people" key="people">
          <div className="text-center">
            <Text variant="secondary" size="XLTitle2">
              Coming Soon...
            </Text>
          </div>
        </OrnamentContentBase>
        <OrnamentContentBase value="environments" key="environments">
          <div className="text-center">
            <Text variant="secondary" size="XLTitle2">
              Stay tuned...
            </Text>
          </div>
        </OrnamentContentBase>
      </OrnamentContents>
      <OrnamentTabs>
        <OrnamentTab
          icon={<AppStoreIcon className="size-6" data-slot="icon" />}
          label="Apps"
          value="apps"
        />
        <OrnamentTab
          icon={<PeopleIcon className="size-6" data-slot="icon" />}
          label="People"
          value="people"
        />
        <OrnamentTab
          icon={<EnvironmentsIcon className="size-6" data-slot="icon" />}
          label="Environments"
          value="environments"
        />
      </OrnamentTabs>
    </Ornament>
  );
}

export default LandingPage;
