---
description: Add unit tests and measure test coverage for the scraper codebase
---

# Test Coverage Workflow

## Steps

1. **Install testing dependencies** - Add Jest or Vitest for testing
// turbo

2. **Create test directory structure** - Set up `__tests__` folder

3. **Write unit tests** - Create tests for:
   - `parseRevenue()` function
   - `parsePercentage()` function
   - `extractCategory()` function
   - Data merging logic in `insertToSupabase()`

4. **Add test script to package.json** - Configure npm test command

5. **Run tests with coverage** - Execute tests and generate coverage report
// turbo

6. **Report results** - Summarize test coverage percentage
