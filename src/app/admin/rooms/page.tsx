import { rooms, roomTypes } from "@/lib/data";

export default function AdminRoomsPage() {
  return (
    <section>
      <h1 className="text-4xl font-semibold">Physical rooms</h1>
      <div className="mt-6 grid gap-3">
        {rooms.map((room) => {
          const type = roomTypes.find((candidate) => candidate.id === room.roomTypeId);
          return <div key={room.id} className="grid gap-3 rounded-lg bg-white p-4 shadow-sm md:grid-cols-4"><span className="font-semibold">Room {room.number}</span><span>{type?.name}</span><span>Floor {room.floor}</span><select defaultValue={room.status} className="rounded-md border border-[var(--line)] px-3 py-2"><option>available</option><option>occupied</option><option>reserved</option><option>under_maintenance</option><option>inactive</option></select></div>;
        })}
      </div>
    </section>
  );
}
