import { getDictionary, isValidLocale } from "@/lib/i18n";
import { loadTeams } from "@/lib/teams";
import { TeamsTable } from "@/components/teams-table";
import { notFound } from "next/navigation";

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const teams = loadTeams();

  return <TeamsTable teams={teams} lang={lang} dict={dict.teamsPage} />;
}
