# Security policy — United Global Consulting

This repository hosts both the existing static site and the new Next.js
app (`next-app/`). Both talk to production services (Supabase, Resend,
Telegram, reCAPTCHA, analytics). Treat this document as **mandatory reading**
before committing.

## 1. Never commit secrets

### What counts as a secret
- API keys: Supabase service_role, Resend, reCAPTCHA secret, any `sk_*` / `sb_secret_*` key
- Tokens: Telegram bot token, JWT service-role tokens, GitHub PATs
- Credentials: `.env*` files, `credentials.json`, private keys (`.pem`, `.key`)
- Personally identifiable information of leads / students

### Where secrets live
- **Local development:** `next-app/.env.local` — **git-ignored**, never commit
- **Production:** Vercel → Project → Settings → Environment Variables — encrypted at rest, inject at runtime
- **Long-term storage:** a personal password manager (Bitwarden / 1Password)

### Where secrets must NEVER appear
- ❌ Git tracked files (scanned by pre-commit hook — see §3)
- ❌ Chat messages, AI prompts, issue/PR descriptions, commit messages
- ❌ Screenshots, videos, screen shares
- ❌ Shared documents (Google Docs, Notion, etc.) unless ACL-locked
- ❌ Unencrypted emails or messenger chats

## 2. If a secret leaks — rotate immediately

Rotating means invalidating the old key and generating a new one. Deletion
alone does not help because copies may exist (local clones, GitHub cache,
CI logs).

| Service | Rotation path |
|---|---|
| Supabase service-role | Dashboard → Settings → API → **Rotate** |
| Supabase anon | Same page — Rotate |
| Resend API key | Dashboard → API Keys → create new, delete old |
| Telegram bot | `@BotFather` → `/revoke` → get new token |
| reCAPTCHA | Google Admin → delete key pair → create new |
| Google Analytics | GA does not expose secrets; Measurement ID is public |
| Yandex Metrika | Counter ID is public; no secret |

After rotation, update:
1. `next-app/.env.local` on every developer machine
2. Vercel → Environment Variables (production + preview)
3. Redeploy production

## 3. Pre-commit hook (automatic secret detector)

A hook at `.githooks/pre-commit` scans every staged diff for patterns
matching real API keys. If a match is found, `git commit` is rejected and
the file / line is printed.

### One-time setup per machine
```bash
git config core.hooksPath .githooks
```

The hook catches:
- `.env`, `.env.local`, `.env.production` being accidentally staged
- Supabase `sb_secret_*`, `sb_publishable_*`, long JWT payloads
- Resend `re_*`
- Telegram bot tokens (`\d+:AA\w+`)
- reCAPTCHA secrets (`6L*`)
- OpenAI `sk-*`, Anthropic `sk-ant-*`, Stripe `sk_live_*`
- AWS access keys `AKIA*`, GitHub tokens `gh[pousr]_*`, Google `AIza*`
- Private keys in PEM format

### Bypass (emergency only)
```bash
git commit --no-verify
```
Do not use this for actual secrets. Rotate them instead.

## 4. Environment-variable naming conventions

Next.js exposes variables prefixed with `NEXT_PUBLIC_` to the browser.
This is a one-way decision: once prefixed, the value is embedded in client
JS bundles and visible to any site visitor.

| Prefix | Exposed to browser | Use for |
|---|---|---|
| `NEXT_PUBLIC_` | ✅ Yes | Anon keys, GA IDs, Yandex IDs, site URL |
| (no prefix) | ❌ Server only | service_role, Resend, Telegram token, reCAPTCHA secret |

Rule of thumb: **if you hesitate**, do NOT prefix with `NEXT_PUBLIC_`.

## 5. Dependencies

- Run `npm audit` before each release. Fix `high` / `critical` issues.
- Pin the major version of security-sensitive libraries (next, next-intl,
  @supabase/supabase-js, resend).
- Review new dependencies before adding — prefer well-known maintainers.

## 6. Supabase Row Level Security

All tables in `leads` / `newsletter_subscribers` must have RLS enabled.
Server-side writes use `service_role` key which bypasses RLS. The `anon`
key should never be able to read leads. Verify with:
```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```
All rows must show `t` (true) under `rowsecurity`.

## 7. Content Security Policy

Production `next.config.ts` + Vercel headers restrict:
- `script-src` to self + analytics + recaptcha
- `connect-src` to self + supabase + telegram + resend + analytics
- Blocks inline scripts except where hashed / nonced

Update CSP in `next.config.ts` when adding a new third-party service.

## 8. Reporting a vulnerability

Email `info@unitedglobal.uz` with subject `SECURITY:`. Do not open a
public GitHub issue. Include:
- Affected URL / endpoint
- Proof of concept (minimal)
- Impact
- Suggested fix (optional)

We commit to respond within 48 hours.

## 9. Appendix — common mistakes to avoid

1. **Pasting secrets into AI chats (Claude, ChatGPT, Copilot, etc.).**
   Anything sent to an AI provider is logged by them. Even if the AI
   never trains on it, operator-side logs exist. Rotate any key you
   suspect is in a chat history.
2. **Printing env in logs.** Never `console.log(process.env)`. Never
   include env vars in Sentry breadcrumbs.
3. **Hardcoding for "just a test".** If you type a real key into any
   source file to run a local test, consider that key compromised.
4. **Public Vercel preview URLs.** Preview deployments inherit env vars.
   If a PR is open to a fork, secrets leak to the forker. Turn on
   **Deployment Protection** in Vercel settings.
5. **Sharing screenshots with terminal open.** Terminal history may show
   recent `curl -H 'Authorization: ...'` commands.

## 10. Review schedule

- **Monthly:** audit Vercel env vars, remove unused
- **Quarterly (every 3 months):** rotate Supabase service_role and Resend keys
- **After any incident:** rotate all secrets, review git history, review CI logs
