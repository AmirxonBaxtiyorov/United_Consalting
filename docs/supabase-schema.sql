-- Supabase database schema for United Global Consulting
-- Run this once in Supabase SQL Editor (Dashboard → SQL Editor → New query).

create extension if not exists "pgcrypto";

-- =========================================================
-- Tables
-- =========================================================

-- Leads captured from the site (contact form, quiz, calculator, etc.)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null,
  phone varchar(25) not null,
  email varchar(120),
  country varchar(50),
  degree varchar(20),
  message text,
  source varchar(50) default 'website',
  locale varchar(5) default 'ru',
  utm_source varchar(100),
  utm_medium varchar(100),
  utm_campaign varchar(100),
  status varchar(20) default 'new',
  notes text,
  manager_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_status_idx on public.leads(status);

-- Newsletter
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email varchar(120) unique not null,
  locale varchar(5) default 'ru',
  unsubscribed boolean default false,
  subscribed_at timestamptz not null default now()
);

-- =========================================================
-- updated_at trigger function
-- =========================================================

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_leads_updated_at on public.leads;
create trigger update_leads_updated_at
  before update on public.leads
  for each row execute function public.update_updated_at_column();

-- =========================================================
-- Row level security
-- service_role bypasses RLS — anon must NOT read/write directly.
-- =========================================================

alter table public.leads enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Drop existing policies (idempotent re-run safety)
drop policy if exists "service_role_all_leads" on public.leads;
drop policy if exists "anon_insert_subscribers" on public.newsletter_subscribers;
drop policy if exists "service_role_all_subscribers" on public.newsletter_subscribers;

-- leads — only service_role can read/write
create policy "service_role_all_leads"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

-- newsletter_subscribers — anon can subscribe (insert), service_role does the rest
create policy "anon_insert_subscribers"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);

create policy "service_role_all_subscribers"
  on public.newsletter_subscribers
  for all
  to service_role
  using (true)
  with check (true);

-- =========================================================
-- Smoke test (uncomment to verify after running)
-- =========================================================
-- insert into public.leads (name, phone, source) values ('Test', '+998000000000', 'sql-test');
-- select count(*) from public.leads;  -- should be 1
-- update public.leads set status = 'contacted' where source = 'sql-test';
-- select updated_at <> created_at as trigger_works from public.leads where source = 'sql-test';
-- delete from public.leads where source = 'sql-test';
