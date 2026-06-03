import { PageShell } from "@/components/page-shell";
import { policies } from "@/lib/data";

export default function PoliciesPage() {
  return (
    <PageShell>
      <section className="container-shell py-14">
        <h1 className="text-5xl font-semibold">Policies</h1>
        <div className="mt-8 grid gap-4">
          {policies.map((policy) => <article key={policy.title} className="rounded-lg bg-white p-6 shadow-sm"><h2 className="text-2xl font-semibold">{policy.title}</h2><p className="mt-3 text-[var(--muted)]">{policy.body}</p></article>)}
        </div>
      </section>
    </PageShell>
  );
}
