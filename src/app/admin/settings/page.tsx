import { property } from "@/lib/data";

export default function AdminSettingsPage() {
  return <section><h1 className="text-4xl font-semibold">Settings</h1><form className="mt-6 grid gap-4 rounded-lg bg-white p-6 shadow-sm"><input defaultValue={property.name} className="h-11 rounded-md border border-[var(--line)] px-3" /><input defaultValue={property.address} className="h-11 rounded-md border border-[var(--line)] px-3" /><input defaultValue={property.primaryPhone} className="h-11 rounded-md border border-[var(--line)] px-3" /><input defaultValue={property.email} className="h-11 rounded-md border border-[var(--line)] px-3" /><button className="w-fit rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">Save settings</button></form></section>;
}
