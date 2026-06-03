import { test, expect } from "@playwright/test";

test("guest searches available rooms", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Check-in").first().fill("2026-07-10");
  await page.getByLabel("Check-out").first().fill("2026-07-12");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("heading", { name: "Availability" })).toBeVisible();
});

test("guest creates a booking and sees a confirmation reference", async ({ page }) => {
  await page.goto("/book?roomTypeId=standard&checkIn=2026-07-10&checkOut=2026-07-12&adults=2&children=0");
  await page.getByLabel("Full name").fill("Test Guest");
  await page.getByLabel("Email").fill("guest@example.com");
  await page.getByLabel("Phone").fill("+256700123456");
  await page.getByLabel("Country").fill("Uganda");
  await page.getByRole("button", { name: "Create booking" }).click();
  await expect(page.getByText(/JB-2026-/)).toBeVisible();
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

test("AI assistant checks availability without bypassing backend rules", async ({ page }) => {
  await page.goto("/");
  await page.locator('button[aria-label="Open booking assistant"]').click();
  await page.getByPlaceholder("Ask about a room").fill("Can you check availability?");
  await page.getByLabel("Send message").click();
  await expect(page.getByText(/check-in date/)).toBeVisible();
});
