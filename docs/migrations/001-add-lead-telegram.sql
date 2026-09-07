-- Adds the Telegram contact captured by the site's application form.
-- Run once in Supabase → SQL Editor → New query.
-- Safe to re-run: the column is only created if it is missing.

alter table public.leads
  add column if not exists telegram varchar(64);
