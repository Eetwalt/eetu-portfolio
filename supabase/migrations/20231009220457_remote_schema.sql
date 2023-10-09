alter table "public"."blogPosts" drop constraint "blogPosts_image_fkey";

alter table "public"."blogPosts" drop column "image";

alter table "public"."blogPosts" drop column "xata.version";

alter table "public"."blogPosts" add column "imageUrl" text;

alter table "public"."works" drop column "image";

alter table "public"."works" add column "imageUrl" text;


