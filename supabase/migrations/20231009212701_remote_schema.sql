
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."blogPosts" (
    "id" "text" NOT NULL,
    "slug" "text",
    "createdAt" "date",
    "updatedAt" "date",
    "title" "text",
    "publishDate" "date",
    "description" "text",
    "altText" "text",
    "tags" "jsonb",
    "content" "text",
    "xata.version" "text",
    "image" "uuid"
);

ALTER TABLE "public"."blogPosts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."works" (
    "id" "text" NOT NULL,
    "name" "text",
    "sizeclass" "text",
    "type" "text",
    "image" "text",
    "altText" "text",
    "tags" "jsonb",
    "order" bigint,
    "content" "text",
    "siteLink" "text",
    "slug" "text",
    "screenshots" "jsonb",
    "xata.createdAt" timestamp with time zone,
    "xata.updatedAt" timestamp with time zone,
    "xata.version" bigint
);

ALTER TABLE "public"."works" OWNER TO "postgres";

ALTER TABLE ONLY "public"."blogPosts"
    ADD CONSTRAINT "blogPosts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."works"
    ADD CONSTRAINT "works_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."blogPosts"
    ADD CONSTRAINT "blogPosts_image_fkey" FOREIGN KEY ("image") REFERENCES "storage"."objects"("id");

CREATE POLICY "Enable read access for all users" ON "public"."blogPosts" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."works" FOR SELECT USING (true);

ALTER TABLE "public"."blogPosts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."works" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."blogPosts" TO "anon";
GRANT ALL ON TABLE "public"."blogPosts" TO "authenticated";
GRANT ALL ON TABLE "public"."blogPosts" TO "service_role";

GRANT ALL ON TABLE "public"."works" TO "anon";
GRANT ALL ON TABLE "public"."works" TO "authenticated";
GRANT ALL ON TABLE "public"."works" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
