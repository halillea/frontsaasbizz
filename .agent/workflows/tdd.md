---
description: Test-Driven Development workflow - write tests first, then implement features
---

# TDD Workflow

## Overview
Follow the Red-Green-Refactor cycle for implementing new features or fixing bugs.

## Steps

1. **Identify the feature/fix** - Define what needs to be implemented or fixed

2. **Write failing tests first** (RED)
   - Create test file in `__tests__/` directory
   - Write tests that describe the expected behavior
   - Run tests to confirm they fail
// turbo

3. **Implement minimum code** (GREEN)
   - Write just enough code to make tests pass
   - Focus on functionality, not optimization
   - Run tests to confirm they pass
// turbo

4. **Refactor** (REFACTOR)
   - Clean up the implementation
   - Improve code quality without changing behavior
   - Run tests to ensure nothing broke
// turbo

5. **Document** - Add JSDoc comments to new functions

6. **Commit** - Stage and commit with conventional commit format

## TDD Best Practices

- **Test one thing at a time** - Each test should verify a single behavior
- **Use descriptive test names** - `test('parseRevenue handles null input')` not `test('test1')`
- **Follow AAA pattern** - Arrange, Act, Assert
- **Keep tests fast** - Unit tests should run in milliseconds
- **Test edge cases** - null, undefined, empty strings, negative numbers

## Test File Naming

- Unit tests: `*.test.ts` or `*.spec.ts`
- Location: `__tests__/` folder or colocated with source

## Coverage Target

Maintain minimum 80% code coverage as per project rules.
