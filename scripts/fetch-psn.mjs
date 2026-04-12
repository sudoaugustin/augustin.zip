import { exchangeNpssoForAccessCode, exchangeAccessCodeForAuthTokens, getUserPlayedGames, getUserTitles } from 'psn-api';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local if PSN_NPSSO isn't already set
if (!process.env.PSN_NPSSO) {
  const envPath = resolve(__dirname, '../.env.local');
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
      const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*)\s*$/);
      if (match) process.env[match[1]] = match[2];
    }
  }
}

const npsso = process.env.PSN_NPSSO;

if (!npsso) {
  console.error('Error: PSN_NPSSO environment variable is required.');
  console.error('Get your NPSSO token from https://ca.account.sony.com/api/v1/ssocookie');
  process.exit(1);
}

function parseDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0m';
  const h = match[1] ? `${match[1]}h ` : '';
  const m = match[2] ? `${match[2]}m` : '0m';
  return `${h}${m}`.trim();
}

async function main() {
  console.log('Authenticating with PSN...');
  const accessCode = await exchangeNpssoForAccessCode(npsso);
  const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

  console.log('Fetching played games...');
  const [{ titles }, { trophyTitles }] = await Promise.all([
    getUserPlayedGames(authorization, 'me', { limit: 15 }),
    getUserTitles(authorization, 'me', { limit: 100 }),
  ]);

  const trophyByName = Object.fromEntries(trophyTitles.map((t) => [t.trophyTitleName, t]));

  const games = titles.filter((t) => t.category.includes('game')).slice(0, 10);

  // Manually mark games you've completed (PSN doesn't track this)
  const completedGames = new Set([
    'RESIDENT EVIL 3',
    'RESIDENT EVIL 2',
    'RESIDENT EVIL 7 biohazard',
    'Resident Evil Village',
    'Grand Theft Auto V (PlayStation®5)',
    'Where Winds Meet (F2P)',
  ]);

  const data = {
    games: games.map((title) => {
      const trophy = trophyByName[title.name];
      return {
        name: title.name,
        iconUrl: title.imageUrl,
        playDuration: parseDuration(title.playDuration),
        progress: trophy?.progress ?? 0,
        completed: completedGames.has(title.name),
      };
    }),
    fetchedAt: new Date().toISOString(),
  };

  const outPath = resolve(__dirname, '../data/psn.json');
  writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`PSN data written to ${outPath}`);
}

main().catch((err) => {
  console.error('Failed to fetch PSN data:', err.message);
  if (err.cause) console.error('Cause:', err.cause);
  process.exit(1);
});
