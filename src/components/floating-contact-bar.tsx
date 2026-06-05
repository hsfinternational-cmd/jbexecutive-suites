"use client";

import Link from "next/link";
import { MessageCircleMore, Phone } from "lucide-react";
import { property, toCallHref } from "@/lib/data";

export function FloatingContactBar() {
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden sm:block">
        <Link
          href={property.whatsappUrl}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-orange)] text-white shadow-[var(--shadow-soft)]"
          aria-label="Book on WhatsApp"
        >
          <MessageCircleMore size={24} />
        </Link>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--brand-border)] bg-white/96 p-3 shadow-[0_-12px_24px_rgba(36,49,43,0.08)] backdrop-blur sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <Link
            href={property.whatsappUrl}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-green)] px-4 text-sm font-semibold text-white"
          >
            <MessageCircleMore size={18} />
            WhatsApp
          </Link>
          <Link
            href={toCallHref(property.primaryPhone)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-cream)] px-4 text-sm font-semibold text-[var(--brand-charcoal)]"
          >
            <Phone size={18} />
            Call now
          </Link>
        </div>
      </div>
    </>
  );
}
