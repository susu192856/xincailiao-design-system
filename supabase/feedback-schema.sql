create extension if not exists pgcrypto;

create table if not exists public.feedback_entries (
  id uuid primary key,
  owner_id uuid not null,
  module text not null,
  page_name text not null,
  page_path text not null,
  detail text not null check (char_length(detail) between 1 and 500),
  screenshots jsonb not null default '[]'::jsonb,
  submit_date date not null,
  status text not null default 'pending' check (status in ('pending', 'resolved')),
  submitter text,
  note text,
  created_at timestamptz not null default now()
);

alter table public.feedback_entries enable row level security;

create or replace function public.is_feedback_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select encode(
    extensions.digest(lower(coalesce(auth.jwt() ->> 'email', '')), 'sha256'),
    'hex'
  ) = 'd1edda92d5f9e097d33868d146403e23d2a45163046f6ad5c3ed9a99178ce2ef';
$$;

revoke all on function public.is_feedback_admin() from public;
grant execute on function public.is_feedback_admin() to anon, authenticated;

drop policy if exists "Visitors can submit feedback" on public.feedback_entries;
create policy "Visitors can submit feedback"
on public.feedback_entries
for insert
to authenticated
with check (owner_id = (select auth.uid()));

drop policy if exists "Visitors see own feedback and admin sees all" on public.feedback_entries;
create policy "Visitors see own feedback and admin sees all"
on public.feedback_entries
for select
to authenticated
using (owner_id = (select auth.uid()) or public.is_feedback_admin());

drop policy if exists "Admin updates feedback" on public.feedback_entries;
create policy "Admin updates feedback"
on public.feedback_entries
for update
to authenticated
using (public.is_feedback_admin())
with check (public.is_feedback_admin());

drop policy if exists "Admin deletes feedback" on public.feedback_entries;
create policy "Admin deletes feedback"
on public.feedback_entries
for delete
to authenticated
using (public.is_feedback_admin());

grant select, insert, update, delete on public.feedback_entries to authenticated;
