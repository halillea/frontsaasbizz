---
description: Run an end-to-end test of the scraper with limited scope
---

# End-to-End Test Workflow

## Steps

1. **Create a test configuration** - Set up a limited scrape (1 category, 1 load more click)

2. **Run the scraper** - Execute with test configuration
// turbo

3. **Verify Supabase insertion** - Check that data was inserted correctly

4. **Run JSON export** - Generate startups.json
// turbo

5. **Validate JSON output** - Verify the JSON file contains expected data structure

6. **Report results** - Summarize e2e test outcome (pass/fail with details)
