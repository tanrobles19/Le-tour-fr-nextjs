import { getDictionary, isValidLocale } from "@/lib/i18n";
import { loadTeams } from "@/lib/teams";
import { TeamGrid } from "@/components/team-grid";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const teams = loadTeams();

  return <TeamGrid teams={teams} lang={lang} dict={dict.home} />;
}
