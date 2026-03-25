-- Orders table: captures customer name + phone before WhatsApp redirect
-- Enables cross-selling and offer campaigns for Derby Restaurant

create table orders (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  items      jsonb not null,
  total      integer not null default 0,
  has_tbc    boolean default false,
  notes      text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table orders enable row level security;

-- Allow website visitors (anon) to insert orders but not read them
create policy "Allow anonymous insert"
  on orders for insert
  to anon
  with check (true);
