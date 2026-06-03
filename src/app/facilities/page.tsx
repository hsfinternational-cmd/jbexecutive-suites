import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { facilities } from "@/lib/data";

export default function FacilitiesPage() {
  return (
    <PageShell>
      <section className="container-shell py-14">
        <h1 className="text-5xl font-semibold">Facilities</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => <p key={facility} className="flex items-center gap-3 rounded-lg bg-white p-5 shadow-sm"><CheckCircle2 className="text-[var(--brand)]" />{facility}</p>)}
        </div>
      </section>
    </PageShell>
  );
}
