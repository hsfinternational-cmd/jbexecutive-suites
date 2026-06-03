import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export default async function ConfirmationPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  return (
    <PageShell>
      <section className="container-shell py-20">
        <div className="rounded-lg bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto text-[var(--brand)]" size={48} />
          <h1 className="mt-4 text-4xl font-semibold">Booking request received</h1>
          <p className="mt-3 text-[var(--muted)]">Your reference is <span className="font-mono font-semibold text-black">{reference}</span>. Payment and final confirmation rules remain enforced by the backend.</p>
        </div>
      </section>
    </PageShell>
  );
}
