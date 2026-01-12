Method 1: The "SQL Editor" Method (Quickest)
This forces Supabase to give you a single, perfectly formatted JSON array that you can just copy-paste.

Go to your Supabase Dashboard.

Open the SQL Editor (the icon with the terminal/brackets [>_]).

Create a New Query.

Paste and run this exact SQL command:
----<<< To delete  infos from old json
    "fetched_at": "2025-12-17 21:15:15.153+00",
    "domain": "cometly.com",
    "mrr_normalized": 220944

SQL

select
  json_agg(
    json_build_object(
      'id', id,
      'company_name', company_name,
      'website_url', website_url,
      'tagline', tagline,
      'category', category,
      'total_revenue', total_revenue,
      'mrr', mrr,
      'location', location,
    'fetched_at', fetched_at
      'founder', founder,
      'founder_social', founder_social,
      'founded_date', founded_date,
  'founder_name' , founder_name,
  'founder_image_local_path' , founder_image_local_path,
  'mom_growth' , mom_growth,
  'last_4_weeks_revenue text' , last_4_weeks_revenue text,
  'subscriptions' , subscriptions
    )
  )
from
  saas_directory;
(Note: If you want to dump every column without typing them out, you can just use select json_agg(saas_directory) from saas_directory; — but the method above lets you curate exactly what goes into your frontend.)

The Result: You will see one single row in the "Results" panel containing a huge JSON blob.

Copy it: Click inside the result cell to copy the full value.

Paste: Open your local saasbizz/content/startups.json file, delete everything, and paste this new content.

Method 2: The "Terminal" Method (Professional)
If you have the Supabase CLI installed, you can run this command directly from your VS Code terminal to overwrite the file instantly. This is better because it avoids manual copy-pasting errors.

Run this command in your project root:

Bash

# If using raw SQL via connection string (Replace YOUR_DB_URL)
psql "YOUR_SUPABASE_DB_URL" -c "COPY (SELECT json_agg(row_to_json(t)) FROM (SELECT * FROM saas_directory) t) TO STDOUT;" > content/startups.json
Or if you are logged in via Supabase CLI:

Bash

supabase db query --project-ref "YOUR_PROJECT_ID" --csv --command "select json_agg(t) from (select * from saas_directory) t;" > content/startups.json
(Note: You might need to manually remove the CSV header quotes if using the second command, which is why Method 1 is often safer for a quick one-off update.)

Verification Checklist
Before you commit the new file, check content/startups.json for these common "Bad Export" signs:

Format: It should start with [ and end with ].

Escaping: Ensure descriptions with quotes (e.g., "It's great") are properly escaped (e.g., "It's great"). (The SQL json_agg function handles this automatically for you).

Empty fields: Check that your new columns (like total_revenue) actually have data and aren't just null.


-------************************-*-*-***********************-
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.saas_directory (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  domain text NOT NULL UNIQUE,
  company_name text,
  website_url text,
  tagline text,
  location text,
  mrr text,
  total_revenue text,
  category text,
  trustmrr_link text,
  fetched_at timestamp with time zone DEFAULT now(),
  is_published boolean DEFAULT false,
  founder text,
  founded_date text,
  founder_social text,
  mom_growth text,
  last_4_weeks_revenue text,
  founder_name text,
  subscriptions numeric,
  founder_image_local_path text,
  CONSTRAINT saas_directory_pkey PRIMARY KEY (id)
);