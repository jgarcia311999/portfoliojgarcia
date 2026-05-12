import { cookies } from "next/headers";
import { HomeClient } from "./components/HomeClient";
import { LOCALE_COOKIE_KEY, parseLocale } from "./lib/preferences";

export default async function Home() {
  const cookieStore = await cookies();
  const initialLocale = parseLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);

  return <HomeClient initialLocale={initialLocale} />;
}
