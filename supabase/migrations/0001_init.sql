-- Northpoint Dental: Phase 2 schema.
-- Catalogue tables are public read. Bookings and time off are reachable only
-- with the service role key (server code). Seed with `npm run seed`.

create extension if not exists btree_gist;

-- ---- enums ----------------------------------------------------------------

create type public.service_category as enum
  ('general', 'hygiene', 'cosmetic', 'restorative', 'orthodontics', 'emergency');

create type public.booking_status as enum
  ('confirmed', 'cancelled', 'completed', 'no_show');

create type public.booking_source as enum ('web', 'chat', 'phone');

create type public.weekday as enum
  ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');

-- ---- clinic settings (exactly one row) ------------------------------------

create table public.clinic_settings (
  id smallint primary key default 1 check (id = 1),
  name text not null,
  timezone text not null default 'Europe/London',
  contact jsonb not null,        -- { phone, phoneHref, whatsapp, email }
  address jsonb not null,        -- { line1, city, postcode, country, lat, lng, ... }
  hours jsonb not null,          -- [{ day, open, close }]
  booking_rules jsonb not null,  -- { slotStepMin, bufferMin, minNoticeHours, windowDays, cancelNoticeHours }
  updated_at timestamptz not null default now()
);

-- ---- catalogue ------------------------------------------------------------

create table public.dentists (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  role text not null,
  bio text not null default '',
  photo_url text not null default '',
  gdc_number text not null,
  years_experience integer not null default 0 check (years_experience >= 0),
  languages text[] not null default '{}',
  specialties text[] not null default '{}',
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.services (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  category public.service_category not null,
  summary text not null default '',
  icon text not null default '',
  default_duration_min integer not null check (default_duration_min > 0),
  member_price_pence integer check (member_price_pence >= 0), -- null = not included
  finance_eligible boolean not null default false,
  popular boolean not null default false,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Price per dentist + service pair, in pence. Missing pair = not offered.
create table public.dentist_services (
  dentist_id bigint not null references public.dentists (id) on delete cascade,
  service_id bigint not null references public.services (id) on delete cascade,
  price_pence integer not null check (price_pence >= 0),
  duration_min integer check (duration_min > 0), -- null = service default
  primary key (dentist_id, service_id)
);
create index dentist_services_service_id_idx on public.dentist_services (service_id);

-- Weekly working pattern, clinic local time.
create table public.availability_rules (
  id bigint generated always as identity primary key,
  dentist_id bigint not null references public.dentists (id) on delete cascade,
  weekday public.weekday not null,
  start_time time not null,
  end_time time not null,
  check (end_time > start_time)
);
create index availability_rules_dentist_idx
  on public.availability_rules (dentist_id, weekday);

create table public.time_off (
  id bigint generated always as identity primary key,
  dentist_id bigint not null references public.dentists (id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  check (ends_at > starts_at)
);
create index time_off_dentist_idx on public.time_off (dentist_id, starts_at);

-- ---- bookings -------------------------------------------------------------

create table public.bookings (
  id bigint generated always as identity primary key,
  reference text not null unique,                 -- e.g. NPD-7K3Q
  dentist_id bigint not null references public.dentists (id) on delete restrict,
  service_id bigint references public.services (id) on delete restrict, -- null = free consultation
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.booking_status not null default 'confirmed',
  patient_name text not null,
  email text not null,
  phone text not null,
  is_new_patient boolean not null default true,
  note text,
  price_pence integer not null check (price_pence >= 0), -- snapshot at booking time
  source public.booking_source not null default 'web',
  manage_token text not null unique,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at),
  -- No two confirmed bookings may overlap for the same dentist.
  -- The buffer between appointments is applied by the slot engine.
  constraint bookings_no_overlap exclude using gist (
    dentist_id with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  ) where (status = 'confirmed')
);
create index bookings_dentist_starts_idx on public.bookings (dentist_id, starts_at);
create index bookings_service_id_idx on public.bookings (service_id);
create index bookings_email_idx on public.bookings (lower(email));
create index bookings_confirmed_starts_idx
  on public.bookings (starts_at) where status = 'confirmed';

-- ---- row level security ---------------------------------------------------

alter table public.clinic_settings enable row level security;
alter table public.dentists enable row level security;
alter table public.services enable row level security;
alter table public.dentist_services enable row level security;
alter table public.availability_rules enable row level security;
alter table public.time_off enable row level security;
alter table public.bookings enable row level security;

-- Least privilege: the public roles get read access to the catalogue only.
revoke all on
  public.clinic_settings, public.dentists, public.services,
  public.dentist_services, public.availability_rules,
  public.time_off, public.bookings
from anon, authenticated;

grant select on
  public.clinic_settings, public.dentists, public.services,
  public.dentist_services, public.availability_rules
to anon, authenticated;

create policy "Public read clinic settings" on public.clinic_settings
  for select to anon, authenticated using (true);

create policy "Public read active dentists" on public.dentists
  for select to anon, authenticated using (active);

create policy "Public read active services" on public.services
  for select to anon, authenticated using (active);

create policy "Public read prices" on public.dentist_services
  for select to anon, authenticated using (true);

create policy "Public read availability" on public.availability_rules
  for select to anon, authenticated using (true);

-- time_off and bookings: no policies and no grants. Only the service role
-- (which bypasses RLS) can read or write them.
