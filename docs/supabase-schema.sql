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

-- Admin activity log (every action in the admin panel is recorded here)
create table if not exists public.admin_activity (
  id uuid primary key default gen_random_uuid(),
  action varchar(40) not null,
  target_type varchar(40),
  target_id varchar(80),
  target_label varchar(200),
  meta jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_activity_created_at_idx on public.admin_activity(created_at desc);
create index if not exists admin_activity_action_idx on public.admin_activity(action);

-- CMS: partner universities (logos shown in the TrustBar)
create table if not exists public.cms_partners (
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  logo_url text not null,
  url text,
  sort_order int not null default 0,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_partners_sort_idx on public.cms_partners(sort_order, created_at);

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

drop trigger if exists update_cms_partners_updated_at on public.cms_partners;
create trigger update_cms_partners_updated_at
  before update on public.cms_partners
  for each row execute function public.update_updated_at_column();

-- =========================================================
-- Row level security
-- service_role bypasses RLS — anon must NOT read/write directly.
-- =========================================================

alter table public.leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.admin_activity enable row level security;
alter table public.cms_partners enable row level security;

-- admin_activity — only service_role
drop policy if exists "service_role_all_activity" on public.admin_activity;
create policy "service_role_all_activity"
  on public.admin_activity for all to service_role
  using (true) with check (true);

-- cms_partners — anon can READ (it's public on the homepage); service_role writes
drop policy if exists "anon_read_partners" on public.cms_partners;
drop policy if exists "service_role_all_partners" on public.cms_partners;
create policy "anon_read_partners"
  on public.cms_partners for select to anon using (hidden = false);
create policy "service_role_all_partners"
  on public.cms_partners for all to service_role
  using (true) with check (true);

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
