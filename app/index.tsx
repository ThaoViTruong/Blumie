import { Href, Redirect } from "expo-router";

export default function IndexScreen() {
  const welcomeRoute = "/welcome" as Href;

  return <Redirect href={welcomeRoute} />;
}
