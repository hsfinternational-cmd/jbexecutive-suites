import Image from "next/image";
import { roomTypes } from "@/lib/data";

export default function AdminGalleryPage() {
  return <section><h1 className="text-4xl font-semibold">Gallery</h1><div className="mt-6 grid gap-4 md:grid-cols-3">{roomTypes.map((roomType) => <div key={roomType.id} className="relative aspect-[4/3] overflow-hidden rounded-lg"><Image src={roomType.images[0].url} alt={roomType.images[0].alt} fill className="object-cover" /></div>)}</div></section>;
}
