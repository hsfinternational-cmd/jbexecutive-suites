import { policies } from "@/lib/data";

export default function AdminPoliciesPage() {
  return <section><h1 className="text-4xl font-semibold">Policies</h1><div className="mt-6 grid gap-4">{policies.map((policy) => <article key={policy.title} className="rounded-lg bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold">{policy.title}</h2><textarea className="mt-3 w-full rounded-md border border-[var(--line)] p-3" defaultValue={policy.body} /></article>)}</div></section>;
}
