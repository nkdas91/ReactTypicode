import { test, expect } from "@playwright/test";

test("navigate to users page", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Users").click();

  await expect(page).toHaveURL(/users/);
});
