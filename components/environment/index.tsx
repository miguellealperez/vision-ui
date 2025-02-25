import { getEnvironment } from "@/lib/cookie-store";
import data from "./data";
import EnvironmentProvider from "./provider";

async function Environment({ children }: { children: React.ReactNode }) {
  const environment = await getEnvironment();
  const activeEnvironment =
    data.find((env) => env.id === environment) ?? data[0];
  return (
    <EnvironmentProvider environment={activeEnvironment}>
      {children}
    </EnvironmentProvider>
  );
}

export default Environment;
