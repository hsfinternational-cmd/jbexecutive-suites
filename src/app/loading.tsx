import Image from "next/image";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--brand-mist)] px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="rounded-[28px] bg-white p-5 shadow-[var(--shadow-soft)]">
          <Image
            src="/images/brand/jb-monogram.png"
            alt="JB Executive Suites logo"
            width={120}
            height={120}
            priority
            className="h-24 w-24 object-contain sm:h-28 sm:w-28"
          />
        </div>
        <div className="space-y-2">
          <p className="font-serif text-3xl text-[var(--brand-green)]">{`JB Executive Suites`}</p>
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-orange)]">{`Where Cleanliness Meets Comfort`}</p>
        </div>
        <div className="h-1.5 w-44 overflow-hidden rounded-full bg-[rgba(5,104,57,0.12)]">
          <div className="loading-bar h-full w-1/2 rounded-full bg-[var(--brand-green)]" />
        </div>
      </div>
    </main>
  );
}
