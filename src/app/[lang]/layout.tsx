import { notFound } from "next/navigation";
import { getDictionary, isValidLocale, locales } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      {children}
    </>
  );
}
