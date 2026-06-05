export type RoomStatus = "available" | "occupied" | "reserved" | "under_maintenance" | "inactive";
export type BookingStatus =
  | "pending"
  | "held"
  | "awaiting_payment"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled"
  | "no_show";
export type PaymentStatus = "not_required" | "pending" | "paid" | "failed" | "refunded" | "partially_refunded";

export type RoomType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: { url: string; alt: string }[];
  maxGuests?: number;
  bedConfiguration?: string;
  roomSize?: string;
  amenities: string[];
  baseNightlyRate: number;
  promotionalRate?: number;
  taxRate: number;
  serviceFee: number;
  cancellationPolicy: string;
  checkInTime: string;
  checkOutTime: string;
};

export type Room = {
  id: string;
  number: string;
  floor: string;
  roomTypeId: string;
  status: RoomStatus;
};

export type Booking = {
  id: string;
  reference: string;
  roomTypeId: string;
  roomId?: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  adults: number;
  children: number;
  totalAmount: number;
  guest: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
  };
};

export type BookingHold = {
  id: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  quantity: number;
  expiresAt: string;
};
