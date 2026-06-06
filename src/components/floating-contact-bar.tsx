"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, MessageCircleMore, Phone, Send, Sparkles, X } from "lucide-react";
import { brand, buildWhatsAppMessage, facilities, formatUGX, property, roomTypes, toCallHref } from "@/lib/data";

type ChatMessage = {
  id: string;
  role: "assistant" | "guest";
  content: string;
};

type BookingStep = "name" | "phone" | "room" | "checkIn" | "checkOut" | "guests" | "email" | "notes" | "done";

type BookingDraft = {
  guestName?: string;
  telephone?: string;
  roomName?: string;
  roomTypeId?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  email?: string;
  message?: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Welcome to JB Executive Suites. I can answer room questions right away and help you prepare a booking request for the reservations team on WhatsApp.",
  },
];

const quickReplies = [
  { label: "Book a room", prompt: "I want to book a room" },
  { label: "Show rates", prompt: "Show room prices" },
  { label: "Amenities", prompt: "What amenities do you have?" },
  { label: "Location", prompt: "Where are you located?" },
];

function answerImmediately(message: string) {
  const normalized = message.toLowerCase();
  const rates = roomTypes
    .map((room) => `${room.name}: from ${formatUGX(room.promotionalRate ?? room.baseNightlyRate)} per night`)
    .join(". ");

  if (
    normalized.includes("book") ||
    normalized.includes("reserve") ||
    normalized.includes("availability") ||
    normalized.includes("check in") ||
    normalized.includes("stay")
  ) {
    return {
      reply:
        "Absolutely. I can collect your stay details now and prepare a WhatsApp booking request for the JB Suites team to confirm availability.",
      booking: true,
    };
  }

  if (normalized.includes("price") || normalized.includes("rate") || normalized.includes("cost")) {
    return {
      reply: rates,
      booking: false,
    };
  }

  if (
    normalized.includes("wifi") ||
    normalized.includes("parking") ||
    normalized.includes("breakfast") ||
    normalized.includes("dstv") ||
    normalized.includes("air condition") ||
    normalized.includes("amenit")
  ) {
    return {
      reply: `Guests can expect ${facilities.join(", ")}.`,
      booking: false,
    };
  }

  if (
    normalized.includes("location") ||
    normalized.includes("where") ||
    normalized.includes("direction") ||
    normalized.includes("map")
  ) {
    return {
      reply: `JB Executive Suites is located in ${property.address}. I can also send you to WhatsApp or help you start a booking now.`,
      booking: false,
    };
  }

  if (normalized.includes("call") || normalized.includes("phone") || normalized.includes("whatsapp") || normalized.includes("contact")) {
    return {
      reply: `You can call ${property.primaryPhone} or message JB Suites on WhatsApp. If you want, I can also package your booking details and open the WhatsApp request for you.`,
      booking: false,
    };
  }

  return {
    reply:
      "I can help with room rates, amenities, directions, and bookings. If you are ready, I can collect your details and open the WhatsApp booking request for JB Suites.",
    booking: false,
  };
}

function nextBookingPrompt(step: BookingStep) {
  switch (step) {
    case "name":
      return "Let’s get your stay request ready. What is your full name?";
    case "phone":
      return "Thanks. What phone number should JB Suites use to reach you?";
    case "room":
      return "Which room would you prefer? You can pick Standard Room, Comfort Room, or Executive Room.";
    case "checkIn":
      return "What is your check-in date?";
    case "checkOut":
      return "Great. What is your check-out date?";
    case "guests":
      return "How many guests should I include?";
    case "email":
      return "What email address should I add? You can also type skip.";
    case "notes":
      return "Any special request or arrival note? You can type skip if not needed.";
    case "done":
      return "Your booking request is ready. Open WhatsApp below and JB Suites will receive the full request.";
  }
}

export function FloatingContactBar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [bookingStep, setBookingStep] = useState<BookingStep | null>(null);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({});

  function appendAssistant(content: string, id?: string) {
    setMessages((current) => [...current, { id: id ?? `assistant-${current.length + 1}`, role: "assistant", content }]);
  }

  function appendGuest(content: string) {
    setMessages((current) => [...current, { id: `guest-${current.length + 1}`, role: "guest", content }]);
  }

  function resetBooking() {
    setBookingDraft({});
    setBookingStep("name");
    appendAssistant(nextBookingPrompt("name"), "booking-start");
  }

  function finishBooking(updatedDraft: BookingDraft) {
    setBookingDraft(updatedDraft);
    setBookingStep("done");
    appendAssistant(nextBookingPrompt("done"), "booking-ready");
  }

  function handleBookingInput(rawValue: string) {
    const value = rawValue.trim();
    if (!value || !bookingStep) return;

    if (bookingStep === "name") {
      setBookingDraft((current) => ({ ...current, guestName: value }));
      setBookingStep("phone");
      appendAssistant(nextBookingPrompt("phone"));
      return;
    }

    if (bookingStep === "phone") {
      setBookingDraft((current) => ({ ...current, telephone: value }));
      setBookingStep("room");
      appendAssistant(nextBookingPrompt("room"));
      return;
    }

    if (bookingStep === "room") {
      const matched = roomTypes.find(
        (roomType) =>
          value.toLowerCase().includes(roomType.name.toLowerCase()) ||
          value.toLowerCase().includes(roomType.slug.toLowerCase()) ||
          value.toLowerCase() === roomType.id.toLowerCase(),
      );
      const roomName = matched?.name || value;
      setBookingDraft((current) => ({
        ...current,
        roomName,
        roomTypeId: matched?.id ?? current.roomTypeId,
      }));
      setBookingStep("checkIn");
      appendAssistant(nextBookingPrompt("checkIn"));
      return;
    }

    if (bookingStep === "checkIn") {
      setBookingDraft((current) => ({ ...current, checkIn: value }));
      setBookingStep("checkOut");
      appendAssistant(nextBookingPrompt("checkOut"));
      return;
    }

    if (bookingStep === "checkOut") {
      setBookingDraft((current) => ({ ...current, checkOut: value }));
      setBookingStep("guests");
      appendAssistant(nextBookingPrompt("guests"));
      return;
    }

    if (bookingStep === "guests") {
      setBookingDraft((current) => ({ ...current, guests: value }));
      setBookingStep("email");
      appendAssistant(nextBookingPrompt("email"));
      return;
    }

    if (bookingStep === "email") {
      const nextDraft = {
        ...bookingDraft,
        email: value.toLowerCase() === "skip" ? "" : value,
      };
      setBookingDraft(nextDraft);
      setBookingStep("notes");
      appendAssistant(nextBookingPrompt("notes"));
      return;
    }

    if (bookingStep === "notes") {
      const nextDraft = {
        ...bookingDraft,
        message: value.toLowerCase() === "skip" ? "Please confirm availability for this stay." : value,
      };
      finishBooking(nextDraft);
    }
  }

  function submitMessage(messageOverride?: string) {
    const trimmed = (messageOverride ?? input).trim();
    if (!trimmed) return;

    setInput("");
    appendGuest(trimmed);

    if (bookingStep && bookingStep !== "done") {
      handleBookingInput(trimmed);
      return;
    }

    const response = answerImmediately(trimmed);
    appendAssistant(response.reply);

    if (response.booking) {
      resetBooking();
    }
  }

  function selectRoom(roomTypeId: string) {
    const room = roomTypes.find((item) => item.id === roomTypeId);
    if (!room) return;
    appendGuest(room.name);
    setBookingDraft((current) => ({ ...current, roomTypeId: room.id, roomName: room.name }));
    setBookingStep("checkIn");
    appendAssistant(nextBookingPrompt("checkIn"));
  }

  const whatsappBookingUrl = useMemo(() => {
    if (bookingStep !== "done") {
      return property.whatsappUrl;
    }

    return buildWhatsAppMessage({
      guestName: bookingDraft.guestName,
      roomName: bookingDraft.roomName,
      checkIn: bookingDraft.checkIn,
      checkOut: bookingDraft.checkOut,
      guests: bookingDraft.guests,
      telephone: bookingDraft.telephone,
      email: bookingDraft.email,
      message: bookingDraft.message,
    });
  }, [bookingDraft, bookingStep]);

  return (
    <>
      {open ? (
        <section className="fixed bottom-4 right-4 z-50 flex w-[min(390px,calc(100vw-24px))] flex-col overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-white shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between bg-[var(--brand-green)] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="relative overflow-hidden rounded-full bg-white p-1">
                <Image src={brand.monogram} alt="JB Executive Suites" width={44} height={44} className="h-11 w-11 object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold">JB AI Concierge</p>
                <p className="text-xs text-white/80">Instant replies and booking handoff</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              aria-label="Close JB AI concierge"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[440px] space-y-3 overflow-y-auto bg-[var(--brand-mist)] p-4">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-3 text-xs text-[var(--brand-muted)] shadow-sm backdrop-blur">
              This assistant can answer common questions immediately and prepare a WhatsApp booking request for the JB reservations team.
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                  message.role === "assistant"
                    ? "bg-white text-[var(--brand-charcoal)] shadow-sm"
                    : "ml-auto bg-[var(--brand-orange)] text-white"
                }`}
              >
                {message.content}
              </div>
            ))}

            {!bookingStep ? (
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => submitMessage(item.prompt)}
                    className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[var(--brand-green)] shadow-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}

            {bookingStep === "room" ? (
              <div className="flex flex-wrap gap-2">
                {roomTypes.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => selectRoom(room.id)}
                    className="rounded-full border border-[var(--brand-border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--brand-charcoal)] shadow-sm"
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            ) : null}

            {bookingStep === "done" ? (
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-[var(--brand-charcoal)]">Booking summary</p>
                <div className="mt-3 space-y-1 text-sm text-[var(--brand-muted)]">
                  <p>Name: {bookingDraft.guestName}</p>
                  <p>Phone: {bookingDraft.telephone}</p>
                  <p>Room: {bookingDraft.roomName}</p>
                  <p>Check-in: {bookingDraft.checkIn}</p>
                  <p>Check-out: {bookingDraft.checkOut}</p>
                  <p>Guests: {bookingDraft.guests}</p>
                  {bookingDraft.email ? <p>Email: {bookingDraft.email}</p> : null}
                  {bookingDraft.message ? <p>Note: {bookingDraft.message}</p> : null}
                </div>
                <Link
                  href={whatsappBookingUrl}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--brand-green)] px-4 text-sm font-semibold text-white"
                >
                  Send booking to WhatsApp
                </Link>
              </div>
            ) : null}
          </div>

          <div className="border-t border-[var(--brand-border)] bg-white p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    submitMessage();
                  }
                }}
                placeholder={bookingStep ? "Type your reply..." : "Ask JB AI concierge anything..."}
                className="h-12 min-w-0 flex-1 rounded-full border border-[var(--brand-border)] px-4 text-sm text-[var(--brand-charcoal)] outline-none placeholder:text-[var(--brand-muted)]"
              />
              <button
                type="button"
                onClick={() => submitMessage()}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-orange)] text-white"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <Link
                href={property.whatsappUrl}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--brand-green)] px-3 font-semibold text-white"
              >
                <MessageCircleMore size={15} />
                WhatsApp
              </Link>
              <Link
                href={toCallHref(property.primaryPhone)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-cream)] px-3 font-semibold text-[var(--brand-charcoal)]"
              >
                <Phone size={15} />
                Call
              </Link>
              <Link
                href={property.googleMapUrl}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--brand-border)] bg-white px-3 font-semibold text-[var(--brand-charcoal)]"
              >
                <MapPin size={15} />
                Map
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-4 right-4 z-50 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[var(--shadow-soft)]"
        aria-label="Open JB AI concierge"
      >
        <Image src={brand.monogram} alt="JB Executive Suites logo" width={56} height={56} className="h-12 w-12 object-contain" />
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-orange)] text-white">
          <Sparkles size={12} />
        </span>
      </button>
    </>
  );
}
