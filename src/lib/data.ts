import type { Booking, BookingHold, Room, RoomType } from "@/lib/types";

export const brand = {
  green: "#056839",
  greenDark: "#004D2B",
  orange: "#F26C25",
  orangeLight: "#F47A2A",
  charcoal: "#24312B",
  mist: "#F5F7F4",
  white: "#FFFFFF",
  cream: "#FAF7F2",
  logo: "/images/brand/jb-executive-suites-logo.webp",
  logoPng: "/images/brand/jb-executive-suites-logo.png",
  monogram: "/images/brand/jb-monogram.webp",
};

export const property = {
  name: "JB Executive Suites",
  slug: "jb-executive-suites",
  tagline: "Where Cleanliness Meets Comfort",
  supportLine: "Clean, secure and comfortable stays in Buwate, Mulawa.",
  description:
    "JB Executive Suites offers clean, comfortable and secure short-stay accommodation in Buwate, Mulawa for guests who value practical convenience, fair room options and dependable hospitality.",
  address: "Buwate, Mulawa, Shimoni Road, Wakiso District, Uganda",
  locationLabel: "Kira - Mulawa, Shimoni Road",
  phoneNumbers: ["0393003491", "0705963661"],
  primaryPhone: "0393003491",
  secondaryPhone: "0705963661",
  phone: "0393003491",
  email: "bookings@jbexecutivesuites.ug",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "0705963661",
  whatsapp: process.env.WHATSAPP_NUMBER || "0705963661",
  whatsappUrl: "https://wa.me/256705963661",
  whatsappMessage: "Hello JB Executive Suites. I would like to check room availability and make a booking.",
  googleDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=0.410776,32.641678",
  googleMapUrl: "https://www.google.com/maps/search/?api=1&query=0.410776,32.641678",
  coordinates: {
    latitude: 0.410776,
    longitude: 32.641678,
  },
  priceRange: "UGX 50,000-100,000",
};

export const trustSignals = ["Bed and breakfast", "Secure parking", "24/7 CCTV", "Free Wi-Fi", "DSTV"];

export const facilities = [
  "Self-contained rooms",
  "Bed and breakfast",
  "Secure car parking",
  "24/7 CCTV surveillance",
  "Free Wi-Fi",
  "DSTV",
  "Air conditioning available in selected rooms",
  "Soft drinks and spirits available on request",
];

export const nearbyPlaces = [
  "TotalEnergies Bulindo Service Station",
  "JTee Supermarket",
  "Restaurants and bars around the Kira-Bulindo area",
  "Additional nearby shops and local services shown on the supplied map",
];

export const policies = [
  {
    title: "Booking confirmation",
    body: "Your booking is confirmed after availability has been checked by the JB Executive Suites team.",
  },
  {
    title: "Room options",
    body: "Room names and inclusions can be updated from the central content file as the team confirms more operational detail.",
  },
  {
    title: "Pricing",
    body: "Published rates are configurable starting prices for the currently approved room options.",
  },
];

export const galleryCollections = [
  {
    title: "Property exterior",
    image: "/images/property/exterior-main-building.webp",
    alt: "Exterior view of JB Executive Suites in Buwate, Mulawa.",
  },
  {
    title: "Courtyard and parking",
    image: "/images/property/courtyard.webp",
    alt: "Courtyard and secure parking area at JB Executive Suites.",
  },
  {
    title: "Guest room",
    image: "/images/rooms/room-standard-01.webp",
    alt: "Neatly prepared guest room at JB Executive Suites.",
  },
  {
    title: "Executive room detail",
    image: "/images/rooms/room-executive-01.webp",
    alt: "Bed styling and room detail inside JB Executive Suites.",
  },
  {
    title: "Kitchenette",
    image: "/images/amenities/kitchenette.webp",
    alt: "Compact kitchenette area inside a JB Executive Suites room.",
  },
  {
    title: "Lounge area",
    image: "/images/amenities/lounge.webp",
    alt: "Compact lounge area for guests at JB Executive Suites.",
  },
  {
    title: "Corridor",
    image: "/images/property/corridor.webp",
    alt: "Clean corridor inside JB Executive Suites.",
  },
  {
    title: "Staircase",
    image: "/images/property/staircase.webp",
    alt: "Staircase inside JB Executive Suites.",
  },
];

export const roomTypes: RoomType[] = [
  {
    id: "standard",
    name: "Standard Room",
    slug: "standard-room",
    description: "A clean and comfortable self-contained room for a restful stay.",
    images: [
      { url: "/images/rooms/room-standard-01.webp", alt: "Standard room at JB Executive Suites with neatly made bed and soft natural light." },
      { url: "/images/rooms/room-standard-02.webp", alt: "Second angle of a standard room at JB Executive Suites." },
    ],
    amenities: ["Self-contained", "Free Wi-Fi", "DSTV", "Breakfast"],
    baseNightlyRate: 50000,
    taxRate: 0,
    serviceFee: 0,
    cancellationPolicy: "Availability is confirmed directly by the JB Executive Suites team.",
    checkInTime: "Flexible on confirmation",
    checkOutTime: "Flexible on confirmation",
  },
  {
    id: "comfort",
    name: "Comfort Room",
    slug: "comfort-room",
    description: "A welcoming room option with extra comfort for short stays in Mulawa.",
    images: [
      { url: "/images/rooms/room-comfort-01.webp", alt: "Comfort room view showing the courtyard side of JB Executive Suites." },
      { url: "/images/rooms/room-comfort-02.webp", alt: "Comfort room bed setup at JB Executive Suites." },
    ],
    amenities: ["Self-contained", "Free Wi-Fi", "DSTV", "Breakfast"],
    baseNightlyRate: 80000,
    taxRate: 0,
    serviceFee: 0,
    cancellationPolicy: "Availability is confirmed directly by the JB Executive Suites team.",
    checkInTime: "Flexible on confirmation",
    checkOutTime: "Flexible on confirmation",
  },
  {
    id: "executive",
    name: "Executive Room",
    slug: "executive-room",
    description: "A spacious accommodation option for guests seeking extra comfort.",
    images: [
      { url: "/images/rooms/room-executive-01.webp", alt: "Executive room bedding detail at JB Executive Suites." },
      { url: "/images/rooms/room-executive-02.webp", alt: "Executive room sitting and kitchenette area at JB Executive Suites." },
    ],
    amenities: ["Self-contained", "Free Wi-Fi", "DSTV", "Breakfast", "Selected rooms with air conditioning"],
    baseNightlyRate: 100000,
    taxRate: 0,
    serviceFee: 0,
    cancellationPolicy: "Availability is confirmed directly by the JB Executive Suites team.",
    checkInTime: "Flexible on confirmation",
    checkOutTime: "Flexible on confirmation",
  },
];

export const rooms: Room[] = [
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `std-${index + 1}`,
    number: `10${index + 1}`,
    floor: index < 4 ? "Ground" : "Upper",
    roomTypeId: "standard",
    status: "available" as const,
  })),
  ...Array.from({ length: 7 }, (_, index) => ({
    id: `cfr-${index + 1}`,
    number: `20${index + 1}`,
    floor: index < 4 ? "Ground" : "Upper",
    roomTypeId: "comfort",
    status: index === 6 ? ("under_maintenance" as const) : ("available" as const),
  })),
  ...Array.from({ length: 5 }, (_, index) => ({
    id: `exe-${index + 1}`,
    number: `30${index + 1}`,
    floor: "Upper",
    roomTypeId: "executive",
    status: "available" as const,
  })),
];

export const sampleBookings: Booking[] = [
  {
    id: "booking-1",
    reference: "JB-2026-1001",
    roomTypeId: "executive",
    roomId: "exe-1",
    checkIn: "2026-06-10",
    checkOut: "2026-06-14",
    status: "confirmed",
    adults: 2,
    children: 0,
    totalAmount: 400000,
    guest: { fullName: "Amina Kato", email: "amina@example.com", phone: "+256701111111", country: "Uganda" },
  },
  {
    id: "booking-2",
    reference: "JB-2026-1002",
    roomTypeId: "standard",
    roomId: "std-2",
    checkIn: "2026-06-12",
    checkOut: "2026-06-13",
    status: "awaiting_payment",
    adults: 1,
    children: 0,
    totalAmount: 50000,
    guest: { fullName: "Daniel Reed", email: "daniel@example.com", phone: "+15551230000", country: "United States" },
  },
];

export const sampleHolds: BookingHold[] = [
  {
    id: "hold-1",
    roomTypeId: "comfort",
    checkIn: "2026-06-18",
    checkOut: "2026-06-20",
    quantity: 1,
    expiresAt: "2026-06-18T10:30:00.000Z",
  },
];

export function formatUGX(amount: number) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function toCallHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function buildWhatsAppMessage(input: {
  guestName?: string;
  roomName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string | number;
  telephone?: string;
  email?: string;
  message?: string;
}) {
  const lines = [
    "Hello JB Executive Suites.",
    "I would like to request a booking.",
    "",
    `Name: ${input.guestName || ""}`,
    `Room preference: ${input.roomName || ""}`,
    `Check-in: ${input.checkIn || ""}`,
    `Check-out: ${input.checkOut || ""}`,
    `Guests: ${input.guests || ""}`,
    `Telephone: ${input.telephone || ""}`,
    `Email: ${input.email || ""}`,
    `Message: ${input.message || ""}`,
    "",
    "Please confirm availability.",
  ];
  return `${property.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
}
