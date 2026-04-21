-- Run once in your Supabase SQL editor.

create extension if not exists "pgcrypto";

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

-- Row level security: server-side inserts via service role key bypass RLS.
-- Keep tables RLS-enabled so anon keys cannot read directly.
alter table public.leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
