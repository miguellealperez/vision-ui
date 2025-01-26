import { Button } from "@/components/core/button";
import {
  Ornament,
  OrnamentContentBase,
  OrnamentContents,
  OrnamentTab,
  OrnamentTabs,
} from "@/components/core/ornament";
import { AppStoreIcon, EnvironmentsIcon, PeopleIcon } from "@/components/icons";

import { Text } from "@/components/ui/typography";
import Link from "next/dist/client/link";
import HomeView from "./home-view";

export const dynamic = "force-dynamic";

function LandingPage() {
  return (
    <Ornament defaultTab="apps">
      <OrnamentContents>
        <OrnamentContentBase value="apps" key="apps">
          <HomeView />
        </OrnamentContentBase>
        <OrnamentContentBase value="people" key="people">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Text variant="secondary" size="XLTitle2">
              Coming Soon...
            </Text>
            <Link href="/docs">
              <Button>View Docs</Button>
            </Link>
            <p className="text-xs opacity-50">
              Created by{" "}
              <Link
                href="https://twitter.com/useOptimistic"
                className="font-semibold text-fd-foreground underline"
              >
                Oliver
              </Link>
              <br />
              Docs powered by{" "}
              <Link
                href="https://fumadocs.vercel.app/"
                className="font-semibold text-fd-foreground underline"
              >
                Fumadocs
              </Link>
            </p>
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
