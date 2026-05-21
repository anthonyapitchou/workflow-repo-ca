# Workflow repo for the CA

## Environment setup

API configuration lives in a `.env` file (not committed). Because this app runs
as plain ES modules in the browser (served by `live-server`, no bundler), the
browser cannot read `.env` directly. Instead, `scripts/generate-config.mjs`
reads `.env` and writes `js/config.js`, which the app imports.

1. Copy the example and fill in your values:

   ```bash
   cp .env.example .env
   ```

   | Variable        | Used for                                                     |
   | --------------- | ------------------------------------------------------------ |
   | `API_BASE_URL`  | Base URL for the Noroff v2 API (used by login, register, …). |
   | `API_KEY`       | Noroff API key for authenticated requests (see note below).  |
   | `TEST_EMAIL`    | Email used by the Playwright login tests.                    |
   | `TEST_PASSWORD` | Password used by the Playwright login tests.                 |

2. Generate `js/config.js` from `.env`:

   ```bash
   npm run config
   ```

   `npm run dev` runs this automatically before starting the dev server, so
   re-run `npm run config` only when you change `.env` while the server is up.

### About the API key

Login and register do **not** require an API key. The key is created after you
log in (`POST /auth/create-api-key`) and is sent as the `X-Noroff-API-Key`
header on authenticated requests. See
https://docs.noroff.dev/docs/v2/auth/api-key.

Note: anything in `js/config.js` ships to the browser, so the `.env` keeps the
key out of git — it does not hide it from end users.
