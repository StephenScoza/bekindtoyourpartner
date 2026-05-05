import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import process from 'node:process';
import { chromium, devices } from 'playwright';

const capturePort = 4327;
const baseUrl = `http://127.0.0.1:${capturePort}`;
const screenshotsDir = path.join(process.cwd(), 'docs', 'screenshots');

async function ensureBuild() {
  await runCommand('npm', ['run', 'build']);
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      shell: true,
      stdio: 'inherit',
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

async function waitForApp() {
  const deadline = Date.now() + 30000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      const html = await response.text();

      if (response.ok && html.includes('Be Kind to Your Partner')) {
        return;
      }
    } catch {
      // Keep polling while the preview server starts.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error('Timed out waiting for the local preview server.');
}

function startPreviewServer() {
  return spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', `${capturePort}`, '--strictPort'], {
    cwd: process.cwd(),
    shell: true,
    stdio: 'inherit',
  });
}

async function captureScreenshots() {
  await fs.mkdir(screenshotsDir, { recursive: true });

  const browser = await chromium.launch();

  try {
    const onboardingContext = await browser.newContext({
      viewport: { width: 1440, height: 1600 },
      colorScheme: 'light',
    });
    const onboardingPage = await onboardingContext.newPage();
    await onboardingPage.goto(baseUrl, { waitUntil: 'networkidle' });
    await onboardingPage.screenshot({
      path: path.join(screenshotsDir, 'onboarding.png'),
      fullPage: true,
    });
    await onboardingContext.close();

    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 1800 },
      colorScheme: 'light',
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.addInitScript(() => {
      const dateKey = new Date().toISOString().slice(0, 10);
      localStorage.setItem(
        'bktyp-settings',
        JSON.stringify({ partnerName: 'Maya', reminderStyle: 'gentle' }),
      );
      localStorage.setItem(
        'bktyp-featured-prompt',
        JSON.stringify({
          promptId: 'quality-time-1',
          dateKey,
          category: 'All',
        }),
      );
      localStorage.setItem(
        'bktyp-history',
        JSON.stringify([
          {
            id: 'seed-1',
            promptId: 'quality-time-1',
            category: 'Quality Time',
            text: 'Give Maya ten distraction-free minutes of your full attention.',
            completedAt: new Date().toISOString(),
            dateKey,
          },
          {
            id: 'seed-2',
            promptId: 'service-4',
            category: 'Acts of Service',
            text: "Prep something for Maya's tomorrow so future-them feels cared for.",
            completedAt: new Date(Date.now() - 86400000).toISOString(),
            dateKey: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
          },
          {
            id: 'seed-3',
            promptId: 'appreciation-2',
            category: 'Appreciation',
            text: 'Send Maya a tiny fan club message about something adorable they do.',
            completedAt: new Date(Date.now() - 172800000).toISOString(),
            dateKey: new Date(Date.now() - 172800000).toISOString().slice(0, 10),
          },
        ]),
      );
    });
    await desktopPage.goto(baseUrl, { waitUntil: 'networkidle' });
    await desktopPage.screenshot({
      path: path.join(screenshotsDir, 'dashboard.png'),
      fullPage: true,
    });
    await desktopContext.close();

    const mobileContext = await browser.newContext({
      ...devices['iPhone 13'],
      colorScheme: 'light',
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.addInitScript(() => {
      const dateKey = new Date().toISOString().slice(0, 10);
      localStorage.setItem(
        'bktyp-settings',
        JSON.stringify({ partnerName: 'Maya', reminderStyle: 'playful' }),
      );
      localStorage.setItem(
        'bktyp-featured-prompt',
        JSON.stringify({
          promptId: 'playfulness-8',
          dateKey,
          category: 'All',
        }),
      );
      localStorage.setItem(
        'bktyp-history',
        JSON.stringify([
          {
            id: 'mobile-1',
            promptId: 'playfulness-8',
            category: 'Playfulness',
            text: 'Text Maya a fake headline announcing their excellence in a ridiculous category.',
            completedAt: new Date().toISOString(),
            dateKey,
          },
        ]),
      );
    });
    await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });
    await mobilePage.screenshot({
      path: path.join(screenshotsDir, 'mobile-dashboard.png'),
      fullPage: true,
    });
    await mobileContext.close();
  } finally {
    await browser.close();
  }
}

async function main() {
  await ensureBuild();

  const server = startPreviewServer();

  try {
    await waitForApp();
    await captureScreenshots();
  } finally {
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
