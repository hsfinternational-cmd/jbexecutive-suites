import { test, expect } from "@playwright/test";

test("guest searches available rooms", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Check-in").first().fill("2026-07-10");
  await page.getByLabel("Check-out").first().fill("2026-07-12");
  await page.getByRole("button", { name: "Check availability" }).first().click();
  await expect(page.getByRole("heading", { name: "Tell us your dates and preferred room option." })).toBeVisible();
});

test("guest can open the WhatsApp booking path", async ({ page }) => {
  await page.goto("/book?roomTypeId=standard&checkIn=2026-07-10&checkOut=2026-07-12");
  await expect(page.getByRole("button", { name: "Send inquiry on WhatsApp" })).toBeVisible();
  await expect(page.getByText(/availability has been checked by the JB Executive Suites team/i)).toBeVisible();
});

test("admin logs in and views bookings", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.goto("/admin/bookings");
  await expect(page.getByText("JB-2026-1001")).toBeVisible();
});

test("admin views room maintenance controls", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.goto("/admin/rooms");
  await expect(page.getByText("Room 205")).toBeVisible();
  await page.locator("select").first().selectOption("under_maintenance");
});

test("homepage exposes the WhatsApp booking CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Book on WhatsApp" }).first()).toBeVisible();
});
