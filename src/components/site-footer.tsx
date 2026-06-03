import Link from "next/link";
import { property } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[#151515] py-10 text-white">
      <div className="container-shell grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{property.name}</p>
          <p className="mt-3 text-sm leading-6 text-white/70">{property.description}</p>
        </div>
        <div className="text-sm text-white/75">
          <p>{property.address}</p>
          <p className="mt-2">{property.phone}</p>
          <p>{property.email}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/75">
          <Link href="/manage-booking">Manage booking</Link>
          <Link href="/admin/login">Admin login</Link>
          <Link href="/policies">Policies</Link>
        </div>
      </div>
    </footer>
  );
}
