import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { galleryCollections } from "@/lib/data";

export default function GalleryPage() {
  return (
    <PageShell>
      <section className="container-shell py-14">
        <h1 className="text-5xl text-[var(--brand-green)]">Gallery</h1>
        <p className="mt-4 max-w-2xl text-[var(--brand-muted)]">
          Bright, truthful images of the rooms, courtyard, parking area and guest spaces at JB Executive Suites.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryCollections.map((item) => (
            <figure key={item.image} className="overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[4/3]">
                <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="33vw" loading="lazy" />
              </div>
              <figcaption className="p-4 text-sm font-medium text-[var(--brand-charcoal)]">{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
