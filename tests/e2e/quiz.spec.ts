import { expect, test } from "@playwright/test";

async function answerAllQuestions(page: import("@playwright/test").Page) {
  for (let index = 0; index < 12; index += 1) {
    const options = page.locator(".option-button");
    await expect(options).toHaveCount(4);

    await options.first().click();
    await expect(page.locator(".option-button.is-selected")).toHaveCount(1);

    await page
      .getByRole("button", {
        name: index === 11 ? "Calculate archetype" : "Continue",
      })
      .click();
  }
}

test("completes the quiz and renders result/share surfaces", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "AI Cognitive Archetype Quiz" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Start assessment" }).click();

  await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
  await expect(page.getByRole("radio")).toHaveCount(4);

  await answerAllQuestions(page);

  await expect(page.getByText("Assessment complete")).toBeVisible();
  await expect(page.locator("#result-title")).toContainText(
    /AI Architect|AI Balancer|Autopilot Builder|AI Passenger/,
  );
  await expect(page.getByRole("heading", { name: "Why this result" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Dimension profile" })).toBeVisible();
  await expect(page.getByText("Three improvement actions")).toBeVisible();
  await expect(page.getByRole("article", { name: /share card/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Download PNG" })).toBeVisible();

  const toolkitLink = page.getByRole("link", {
    name: "Improve your AI thinking habits",
  });

  await expect(toolkitLink).toHaveAttribute(
    "href",
    "https://javz.gumroad.com/l/the-thinking-engineer-toolkit",
  );
  await expect(toolkitLink).toHaveAttribute("target", "_blank");
  await expect(toolkitLink).toHaveAttribute("rel", "noreferrer");

  await expect(page.locator(".share-card-footer")).toContainText(
    "http://127.0.0.1:5173",
  );
});

test("supports arrow-key radio navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start assessment" }).click();

  const options = page.getByRole("radio");
  await expect(options).toHaveCount(4);

  await options.first().focus();
  await page.keyboard.press("ArrowDown");

  await expect(options.nth(1)).toBeChecked();
  await expect(page.locator(".option-button.is-selected")).toHaveCount(1);

  await page.keyboard.press("ArrowUp");
  await expect(options.nth(0)).toBeChecked();
});

test("renders a stable share card image surface on desktop and mobile", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start assessment" }).click();
  await answerAllQuestions(page);

  const shareCard = page.getByRole("article", { name: /share card/ });
  await expect(shareCard).toBeVisible();

  const desktopBox = await shareCard.boundingBox();
  expect(desktopBox?.width).toBeGreaterThan(300);
  expect(desktopBox?.height).toBeGreaterThan(450);

  const desktopPng = await shareCard.screenshot();
  expect(desktopPng.byteLength).toBeGreaterThan(10_000);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(shareCard).toBeVisible();

  const mobileMetrics = await shareCard.evaluate((element) => ({
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height,
    scrollWidth: element.scrollWidth,
  }));

  expect(mobileMetrics.width).toBeGreaterThan(300);
  expect(mobileMetrics.height).toBeGreaterThan(560);
  expect(mobileMetrics.scrollWidth).toBeLessThanOrEqual(Math.ceil(mobileMetrics.width));
});
