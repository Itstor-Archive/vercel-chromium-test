import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

chromium.setGraphicsMode = false;
chromium.setHeadlessMode = true;

export async function GET() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar"
    ),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto(
    "https://food.grab.com/id/id/cuisines/aneka-nasi-delivery/144"
  );
  const pageTitle = await page.title();
  await browser.close();

  return new Response(JSON.stringify({ pageTitle }), { status: 200 });
}

export const dynamic = "force-dynamic";
