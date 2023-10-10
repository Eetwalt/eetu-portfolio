alter table "public"."works" drop column "xata.createdAt";

alter table "public"."works" drop column "xata.updatedAt";

alter table "public"."works" drop column "xata.version";

alter table "public"."works" add column "createdAt" timestamp with time zone;

alter table "public"."works" add column "updatedAt" timestamp with time zone;

alter table "public"."works" alter column "screenshots" set data type text[] using "screenshots"::text[];

create policy "Enable insert for all users"
on "public"."comments"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."comments"
as permissive
for select
to public
using (true);



