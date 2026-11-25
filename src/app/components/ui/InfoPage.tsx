import Breadcrumbs from "@/app/components/ui/Breadcrumbs";

export default function InfoPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="container pb-24 pt-8 md:pt-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <header className="mb-12 mt-6 max-w-3xl">
        <h1 className="font-display text-5xl md:text-7xl">{title}</h1>
        {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
      </header>
      <div className="max-w-3xl space-y-10">{children}</div>
    </main>
  );
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-2xl md:text-3xl">{title}</h2>
      <div className="space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}