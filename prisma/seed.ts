import bcrypt from "bcryptjs";
import { PrismaClient, RoomStatus } from "@prisma/client";
import { facilities, policies, property, roomTypes, rooms, sampleBookings } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@jbexecutivesuites.test";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me-in-production";
  const savedProperty = await prisma.property.upsert({
    where: { slug: property.slug },
    update: {
      name: property.name,
      slug: property.slug,
      description: property.description,
      address: property.address,
      phone: property.phone,
      email: property.email,
      whatsapp: property.whatsapp,
      mapUrl: property.googleMapUrl,
    },
    create: {
      name: property.name,
      slug: property.slug,
      description: property.description,
      address: property.address,
      phone: property.phone,
      email: property.email,
      whatsapp: property.whatsapp,
      mapUrl: property.googleMapUrl,
    },
  });

  for (const name of facilities) {
    await prisma.amenity.upsert({ where: { name }, update: {}, create: { name } });
  }

  for (const roomType of roomTypes) {
    const savedRoomType = await prisma.roomType.upsert({
      where: { slug: roomType.slug },
      update: {
        name: roomType.name,
        description: roomType.description,
        maxGuests: roomType.maxGuests ?? 2,
        bedConfiguration: roomType.bedConfiguration ?? "Configuration to be confirmed",
        roomSize: roomType.roomSize ?? "To be confirmed",
        baseNightlyRate: roomType.baseNightlyRate,
        promotionalRate: roomType.promotionalRate,
        taxRate: roomType.taxRate,
        serviceFee: roomType.serviceFee,
        cancellationPolicy: roomType.cancellationPolicy,
      },
      create: {
        propertyId: savedProperty.id,
        name: roomType.name,
        slug: roomType.slug,
        description: roomType.description,
        maxGuests: roomType.maxGuests ?? 2,
        bedConfiguration: roomType.bedConfiguration ?? "Configuration to be confirmed",
        roomSize: roomType.roomSize ?? "To be confirmed",
        baseNightlyRate: roomType.baseNightlyRate,
        promotionalRate: roomType.promotionalRate,
        taxRate: roomType.taxRate,
        serviceFee: roomType.serviceFee,
        cancellationPolicy: roomType.cancellationPolicy,
        images: { create: roomType.images.map((image, sortOrder) => ({ ...image, sortOrder })) },
        ratePlans: { create: { name: "Flexible", description: roomType.cancellationPolicy, refundable: true } },
      },
    });
    for (const amenityName of roomType.amenities) {
      const amenity = await prisma.amenity.upsert({ where: { name: amenityName }, update: {}, create: { name: amenityName } });
      await prisma.roomTypeAmenity.upsert({
        where: { roomTypeId_amenityId: { roomTypeId: savedRoomType.id, amenityId: amenity.id } },
        update: {},
        create: { roomTypeId: savedRoomType.id, amenityId: amenity.id },
      });
    }
  }

  for (const room of rooms) {
    const roomType = await prisma.roomType.findFirstOrThrow({ where: { slug: roomTypes.find((candidate) => candidate.id === room.roomTypeId)?.slug } });
    await prisma.room.upsert({
      where: { number: room.number },
      update: { status: room.status.toUpperCase() as RoomStatus },
      create: { number: room.number, floor: room.floor, status: room.status.toUpperCase() as RoomStatus, roomTypeId: roomType.id },
    });
  }

  for (const policy of policies) {
    await prisma.policy.create({ data: { propertyId: savedProperty.id, key: policy.title.toLowerCase().replace(/\s+/g, "-"), ...policy } });
  }

  for (const booking of sampleBookings) {
    const roomType = await prisma.roomType.findFirstOrThrow({ where: { slug: roomTypes.find((candidate) => candidate.id === booking.roomTypeId)?.slug } });
    await prisma.booking.upsert({
      where: { reference: booking.reference },
      update: {},
      create: {
        reference: booking.reference,
        status: booking.status.toUpperCase() as never,
        checkIn: new Date(`${booking.checkIn}T00:00:00Z`),
        checkOut: new Date(`${booking.checkOut}T00:00:00Z`),
        adults: booking.adults,
        children: booking.children,
        totalAmount: booking.totalAmount,
        guest: { create: booking.guest },
        rooms: { create: { roomTypeId: roomType.id, nightlyRate: roomType.promotionalRate ?? roomType.baseNightlyRate } },
      },
    });
  }

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, name: "Development Admin", passwordHash: await bcrypt.hash(adminPassword, 12) },
  });
}

main().finally(async () => prisma.$disconnect());
