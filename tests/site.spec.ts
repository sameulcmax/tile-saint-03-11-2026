import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync } from "node:fs";

const routes = [
  "/",
  "/about",
  "/services",
  "/tile-flooring-installation",
  "/bathroom-remodeling",
  "/projects",
  "/service-areas",
  "/service-areas/kinnelon-nj",
  "/service-areas/mahwah-nj",
  "/service-areas/morristown-nj",
  "/service-areas/parsippany-nj",
  "/service-areas/butler-nj",
  "/contact",
  "/guides/choosing-your-tile",
  "/guides/planning-a-bathroom",
  "/guides/preparing-your-project",
  "/image-credits",
];

for (const route of routes) {
  test(`route, metadata, and hero: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(async () => {
        await document.fonts.load('500 16px "Albert Sans"');
        await document.fonts.load('700 48px "Barlow"');
        return document.fonts.check('500 16px "Albert Sans"');
      }),
    ).toBeTruthy();
    await expect(page).toHaveTitle(/Tile Saint, LLC/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://tilesaint.com${route}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://tilesaint.com${route}`,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    expect(errors).toEqual([]);
  });
}

test("all local photography files load successfully", async ({ page }) => {
  await page.goto("/");
  const files = readdirSync("public/images-client").filter((file) =>
    file.endsWith(".webp"),
  );
  const failed = await page.evaluate(async (names) => {
    const results = await Promise.all(
      names.map(
        (name) =>
          new Promise<string | null>((resolve) => {
            const image = new Image();
            image.onload = () => resolve(null);
            image.onerror = () => resolve(name);
            image.src = `/images-client/${name}`;
          }),
      ),
    );
    return results.filter(Boolean);
  }, files);
  expect(failed).toEqual([]);
  expect(await page.locator(".material-card-image img").count()).toBe(6);
  expect(
    await page.locator(".material-card-image img").evaluateAll((images) =>
      images.every((image) => image.src.startsWith("https://images.pexels.com/")),
    ),
  ).toBeTruthy();
  expect(
    await page.locator("img:not(.material-card-image img)").evaluateAll((images) =>
      images.every((image) =>
        image.getAttribute("src")?.startsWith("/images-client/"),
      ),
    ),
  ).toBeTruthy();
});

test("desktop dropdowns navigate to independent service and location pages", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".desktop-nav .nav-dropdown").first().hover();
  await page
    .locator("#dropdown-services")
    .getByRole("link", { name: "Tile Flooring Installation", exact: true })
    .click();
  await expect(page).toHaveURL(/tile-flooring-installation$/);
  await page.locator(".desktop-nav .nav-dropdown").last().hover();
  await page
    .locator("#dropdown-areas")
    .getByRole("link", { name: "Mahwah, NJ" })
    .click();
  await expect(page).toHaveURL(/service-areas\/mahwah-nj$/);
  await expect(page.locator("h1")).toContainText("Mahwah");
});

test("hero slides, process accordion, FAQ, and testimonial controls work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Show hero slide 2" }).click();
  await expect(page.locator(".hero-slide-copy")).toContainText(
    "Beautiful bathrooms.",
  );
  await page.getByRole("button", { name: "Previous hero slide" }).click();
  await expect(page.locator(".hero-slide-copy")).toContainText(
    "Crafted with precision.",
  );
  await page.getByRole("button", { name: "Pause hero slideshow" }).click();
  await expect(
    page.getByRole("button", { name: "Play hero slideshow" }),
  ).toBeVisible();
  await page.locator(".process-step h3 button").nth(1).click();
  await expect(page.locator(".process-step h3 button").nth(1)).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(page.locator("#process-step-1")).toContainText(
    "subfloor leveling",
  );
  const faq = page.getByRole("button", {
    name: "What types of tile do you install?",
  });
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".faq-item").first()).toContainText(
    "porcelain, marble, granite",
  );
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Next testimonial" }).click();
  await expect(page.locator(".testimonial-content figcaption")).toContainText(
    "Angela Brooks",
  );
});

test("interior carousel supports arrows, pagination, and mouse dragging", async ({
  page,
}) => {
  await page.goto("/");
  const track = page.locator(".spaces-track");
  await page.getByRole("button", { name: "Next spaces" }).click();
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(50);
  await page.locator(".line-pagination button").last().click();
  await expect(
    page.getByRole("button", { name: "Next spaces" }),
  ).toBeDisabled();
  await page.locator(".line-pagination button").first().click();
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeLessThan(3);
  await track.scrollIntoViewIfNeeded();
  const box = await track.boundingBox();
  if (!box) throw new Error("Carousel missing");
  await page.mouse.move(box.x + 650, box.y + 150);
  await page.mouse.down();
  await page.mouse.move(box.x + 250, box.y + 150, { steps: 15 });
  await page.mouse.up();
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(150);
  await expect(page).toHaveURL("/");
});

test("material tabs support keyboard selection and prefilled inquiries", async ({
  page,
}) => {
  await page.goto("/");
  const marble = page.getByRole("tab", { name: "Marble", exact: true });
  await marble.click();
  await expect(marble).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "Naturally individual.",
  );
  await marble.press("ArrowDown");
  await expect(
    page.getByRole("tab", { name: "Granite", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Granite", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.getByRole("link", { name: "Discuss Your Tile Choice" }).click();
  await expect(page).toHaveURL(/contact\?material=Granite/);
  await expect(page.locator("#inquiry-material")).toHaveValue("Granite");
});

test("portfolio filters and accessible lightbox work", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Showers", exact: true }).click();
  await expect(page.locator(".project-item")).toHaveCount(2);
  await expect(page).toHaveURL(/category=Showers/);
  const opener = page.getByRole("button", {
    name: "View Quietly Contemporary",
    exact: true,
  });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close image gallery" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("button", { name: "Next gallery image" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Close image gallery" }),
  ).toBeFocused();
  await expect(dialog).toContainText(
    "Architectural inspiration, not a completed Tile Saint",
  );
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator("h2")).toContainText("Warmth in Every Detail");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await page.getByRole("button", { name: "All Spaces", exact: true }).click();
  await expect(page.locator(".project-item")).toHaveCount(9);
});

test("contact form validates and prepares an email without submitting to a server", async ({
  page,
  context,
}) => {
  const sentRequests: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") sentRequests.push(request.url());
  });
  await page.goto("/contact?service=flooring&area=Kinnelon");
  await expect(page.locator("#inquiry-service")).toHaveValue(
    "Tile Flooring Installation",
  );
  await expect(page.locator("#inquiry-area")).toHaveValue("Kinnelon");
  await page
    .getByRole("button", { name: "Prepare My Estimate Inquiry" })
    .click();
  await expect(page.locator("#inquiry-name")).toBeFocused();
  await expect(page.getByRole("alert")).toContainText("highlighted fields");
  await page.locator("#inquiry-name").fill("Alex Homeowner");
  await page.locator("#inquiry-email").fill("alex@example.com");
  await page.locator("#inquiry-phone").fill("(201) 555-0123");
  await page
    .locator("#inquiry-description")
    .fill(
      "We would like porcelain tile flooring installed in our kitchen, approximately 200 square feet.",
    );
  await page.locator('input[name="consent"]').check();
  await page
    .getByRole("button", { name: "Prepare My Estimate Inquiry" })
    .click();
  await expect(page.locator(".inquiry-preview")).toBeVisible();
  await expect(page.locator(".inquiry-preview")).toContainText(
    "Nothing has been sent or saved to a server.",
  );
  await expect(
    page.getByRole("link", { name: "Open in Email App" }),
  ).toHaveAttribute("href", /^mailto:tilesaintllc@gmail\.com\?subject=/);
  await expect(page.locator(".inquiry-summary")).toContainText(
    "Alex Homeowner",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".inquiry-preview").scrollIntoViewIfNeeded();
  const inquiryAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(inquiryAudit.violations).toEqual([]);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy Inquiry" }).click();
  await expect(
    page.getByRole("button", { name: "Inquiry Copied" }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download Text" }).click();
  expect((await download).suggestedFilename()).toBe(
    "tile-saint-estimate-inquiry.txt",
  );
  await page.getByRole("button", { name: "Edit Details" }).click();
  await expect(page.locator("#inquiry-name")).toHaveValue("Alex Homeowner");
  expect(sentRequests).toEqual([]);
});

test("mobile navigation, nested menus, call links, and action bar work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".mobile-action-bar")).toBeVisible();
  await expect(
    page.locator(".mobile-action-bar").getByRole("link", { name: "Call Now" }),
  ).toHaveAttribute("href", "tel:+16464912546");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(
    page.getByRole("dialog", { name: "Main navigation" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Toggle services" }).click();
  await page
    .locator(".mobile-submenu")
    .getByRole("link", { name: "Bathroom Remodeling" })
    .click();
  await expect(page).toHaveURL("/bathroom-remodeling");
  await expect(
    page.getByRole("dialog", { name: "Main navigation" }),
  ).not.toBeVisible();
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation menu" }),
  ).toBeFocused();
  await page
    .locator(".mobile-action-bar")
    .getByRole("link", { name: "Get Estimate" })
    .click();
  await expect(page).toHaveURL("/contact");
});

test("all pages fit mobile and compact tablet viewports", async ({ page }) => {
  test.setTimeout(60000);
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of width === 390
      ? routes
      : ["/", "/contact", "/services", "/projects", "/service-areas"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBeTruthy();
    }
  }
});

test("missing pages have a useful recovery path", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.locator("h1")).toContainText("back to beautiful");
  await page
    .getByRole("link", { name: "Explore Tile Saint", exact: true })
    .click();
  await expect(page).toHaveURL("/");
});

test("short mobile screens keep hero actions above the fixed action bar", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  for (const index of [1, 2, 3]) {
    await page
      .getByRole("button", { name: `Show hero slide ${index}` })
      .click();
    await page.waitForTimeout(450);
    const bounds = await page.locator(".hero-actions").boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(511);
  }
});

test("key page compositions pass automated WCAG A and AA checks", async ({
  page,
}) => {
  test.setTimeout(60000);
  for (const route of ["/", "/services", "/service-areas", "/contact"]) {
    await page.goto(route);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 650) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(300);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations, `Accessibility violations on ${route}`).toEqual(
      [],
    );
  }
});

test("expanded mobile navigation passes automated accessibility checks", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.getByRole("button", { name: "Toggle services" }).click();
  await page.waitForTimeout(350);
  const result = await new AxeBuilder({ page })
    .include(".mobile-menu")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});

test("back-to-top control returns the visitor to the main navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Back to Top" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(3);
});

test("header search filters real pages and opens a prefilled inquiry", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.locator("#inquiry-name").fill("Pat Homeowner");
  await page
    .getByRole("button", { name: "Search the website", exact: true })
    .click();
  const dialog = page.getByRole("dialog", {
    name: "What are you looking for?",
  });
  await expect(dialog).toBeVisible();
  await dialog
    .getByRole("textbox", { name: "Search Tile Saint" })
    .fill("porcelain");
  const searchAudit = await new AxeBuilder({ page })
    .include(".tool-modal")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(searchAudit.violations).toEqual([]);
  await dialog
    .getByRole("link", { name: /Porcelain Tile Installation/ })
    .click();
  await expect(page).toHaveURL(/contact\?material=Porcelain/);
  await expect(page.locator("#inquiry-material")).toHaveValue("Porcelain");
  await expect(page.locator("#inquiry-name")).toHaveValue("Pat Homeowner");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("service-area finder navigates to a dedicated local page", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Find your service area", exact: true })
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Craftsmanship, close to home.",
  });
  await dialog.getByRole("link", { name: "Mahwah, NJ", exact: true }).click();
  await expect(page).toHaveURL("/service-areas/mahwah-nj");
  await expect(page.locator("h1")).toContainText("Mahwah");
});

test("style guide provides an inspiration direction without a server", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Discover Your Direction" }).click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("button", { name: "A New Bathroom", exact: true })
    .click();
  await dialog
    .getByRole("button", { name: "Warm & Natural", exact: true })
    .click();
  await dialog.getByRole("button", { name: "Marble", exact: true }).click();
  await expect(dialog).toContainText(
    "Your choices are not submitted or stored.",
  );
  await dialog.getByRole("link", { name: "Discuss Your Project" }).click();
  await expect(page).toHaveURL(/contact\?material=Marble&service=bathroom/);
  await expect(page.locator("#inquiry-service")).toHaveValue(
    "Bathroom Remodeling",
  );
  await expect(page.locator("#inquiry-material")).toHaveValue("Marble");
});

test("style guide keeps keyboard focus inside each new question", async ({
  page,
}) => {
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Discover Your Direction" });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("h2")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", {
      name: "Living & Kitchen Floors",
      exact: true,
    }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(dialog.locator("h2")).toHaveText("What feels most like you?");
  await expect(dialog.locator("h2")).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(dialog.locator("h2")).toHaveText(
    "Which material catches your eye?",
  );
  await expect(dialog.locator("h2")).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(dialog.locator("h2")).toHaveText(
    "Your next chapter starts here.",
  );
  const styleAudit = await new AxeBuilder({ page })
    .include(".style-guide-modal")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(styleAudit.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});
