import { PageShell } from "@/components/page-shell";
import { property } from "@/lib/data";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="container-shell py-14">
        <h1 className="text-5xl text-[var(--brand-green)]">About JB Executive Suites</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--brand-muted)]">{property.description}</p>
      </section>
    </PageShell>
  );
}
