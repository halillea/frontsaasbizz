# Git Workflow Guide for SaaSBizz

This guide explains how to use Git to save your code changes and deploy them to production (Vercel).

---

## 📚 Understanding the Basics

### What is Git?

Git is a version control system that tracks changes to your code. Think of it like a "save game" feature for your project - you can save snapshots of your code at any point and go back to them later.

### Key Concepts

| Term | What it means |
|------|---------------|
| **Repository (repo)** | Your project folder tracked by Git |
| **Commit** | A saved snapshot of your changes (like a save point) |
| **Branch** | A separate line of development (like a parallel universe for your code) |
| **Push** | Upload your local commits to GitHub |
| **Pull** | Download changes from GitHub to your computer |
| **Tag** | A label for a specific commit (like naming a version "MVP.02") |

### Our Branch Structure

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Your PC   │ ──► │   develop   │ ──► │    main     │
│  (local)    │     │  (testing)  │     │ (production)│
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                         ┌─────────┐
                                         │ Vercel  │
                                         │ (live)  │
                                         └─────────┘
```

- **develop branch**: Where we test new features before going live
- **main branch**: The production branch that Vercel deploys automatically

---

## 🔧 Part 1: Creating a Commit After Changes

After you make changes to your code, you need to "commit" them (save a snapshot).

### Step 1: Check what files you changed

```bash
git status
```

**What this does:** Shows you a list of files that have been:

- 🟢 **Green (staged)**: Ready to be committed
- 🔴 **Red (not staged)**: Changed but not yet added to the commit

**Example output:**

```
On branch develop
Changes not staged for commit:
  modified:   components/StartupCard.vue
  modified:   utils/helpers.ts

Untracked files:
  howto-git.md
```

### Step 2: Add files to your commit

**Option A: Add ALL changed files**

```bash
git add .
```

**What this does:** The `.` means "everything in current folder". This stages ALL your changes to be committed.

**Option B: Add specific files only**

```bash
git add components/StartupCard.vue
git add utils/helpers.ts
```

**What this does:** Only stages the specific files you list. Use this when you want to commit only some of your changes.

### Step 3: Create the commit (save the snapshot)

```bash
git commit -m "Your message describing what you changed"
```

**What this does:** Creates a permanent snapshot of your staged changes with a description.

**Good commit message examples:**

- `git commit -m "Fix revenue formatting in StartupCard"`
- `git commit -m "Add new helper function for currency display"`
- `git commit -m "Update schema to use trustmrr_link field"`

**Bad commit message examples:**

- ❌ `git commit -m "fix"`  (too vague)
- ❌ `git commit -m "changes"` (doesn't describe what changed)

---

## 🏷️ Part 2: Tagging a Version

Tags are permanent labels for specific versions. We use the format `MVP.0X` where X increases with each release.

**Current version:** `MVP.01` (already deployed)
**Next version:** `MVP.02`

### Create a new version tag

```bash
git tag -a MVP.02 -m "Description of this version"
```

**What this does:**

- `-a MVP.02` creates an "annotated" tag named MVP.02
- `-m "Description"` adds a message explaining what's in this version

**Example:**

```bash
git tag -a MVP.02 -m "Schema migration, improved test coverage, fixed sitemap"
```

### View all existing tags

```bash
git tag
```

**What this does:** Lists all tags in your repository.

### View details of a specific tag

```bash
git show MVP.02
```

**What this does:** Shows the commit and message associated with that tag.

---

## 🚀 Part 3: Push to the Develop Branch

After committing your changes, push them to the `develop` branch on GitHub.

### Step 1: Make sure you're on the develop branch

```bash
git branch
```

**What this does:** Shows all local branches. The current branch has a `*` next to it.

**Expected output:**

```
* develop
  main
```

If you're NOT on develop, switch to it:

```bash
git checkout develop
```

### Step 2: Pull the latest changes (safety check)

```bash
git pull origin develop
```

**What this does:** Downloads any changes from GitHub that you might not have locally. This prevents conflicts if someone else made changes.

**What "origin" means:** This is the default name for your GitHub repository.

### Step 3: Push your commits to develop

```bash
git push origin develop
```

**What this does:** Uploads all your new commits from your local `develop` branch to GitHub's `develop` branch.

### Step 4: Push your tag (if you created one)

```bash
git push origin MVP.02
```

**What this does:** Uploads the tag to GitHub. Tags don't get pushed automatically with regular pushes.

**To push ALL tags at once:**

```bash
git push origin --tags
```

---

## 🌐 Part 4: Deploy to Production (Push Develop to Main)

Once you've tested your changes on the develop branch and everything works, push to main to deploy to Vercel.

### Step 1: Switch to the main branch

```bash
git checkout main
```

**What this does:** Switches your working directory to the main branch.

### Step 2: Pull the latest main (safety check)

```bash
git pull origin main
```

**What this does:** Makes sure your local main is up to date with GitHub.

### Step 3: Merge develop into main

```bash
git merge develop
```

**What this does:** Takes all the commits from `develop` and applies them to `main`. This is like copying all your tested changes into production.

**If there are no conflicts, you'll see:**

```
Updating abc1234..def5678
Fast-forward
 components/StartupCard.vue | 10 +++++-----
 utils/helpers.ts           |  5 +++--
 2 files changed, 8 insertions(+), 7 deletions(-)
```

### Step 4: Push main to GitHub (triggers Vercel deploy)

```bash
git push origin main
```

**What this does:** Uploads main to GitHub. Since Vercel is connected to the main branch, this automatically triggers a new deployment!

### Step 5: Switch back to develop for future work

```bash
git checkout develop
```

**What this does:** Returns you to the develop branch so you can continue working on new features.

---

## 📋 Quick Reference: Complete Workflow

Here's the entire workflow in one place:

### After making changes

```bash
# 1. See what you changed
git status

# 2. Stage all changes
git add .

# 3. Commit with a message
git commit -m "Describe your changes"

# 4. Tag the version (if releasing)
git tag -a MVP.02 -m "Version description"

# 5. Push to develop
git push origin develop
git push origin MVP.02   # Push the tag
```

### When ready for production

```bash
# 1. Switch to main
git checkout main

# 2. Pull latest
git pull origin main

# 3. Merge develop
git merge develop

# 4. Push to trigger Vercel deploy
git push origin main

# 5. Return to develop
git checkout develop
```

---

## ⚠️ Common Issues & Solutions

### "Your branch is behind"

```bash
git pull origin develop
```

Then try your push again.

### "Merge conflict"

This happens when the same line was changed in both branches. You'll need to:

1. Open the conflicting file
2. Look for `<<<<<<< HEAD` markers
3. Choose which version to keep
4. Remove the conflict markers
5. `git add .` and `git commit -m "Resolve merge conflict"`

### "fatal: not a git repository"

You're in the wrong folder. Navigate to the project:

```bash
cd c:\git-clone\saasbizzgemi
```

### View commit history

```bash
git log --oneline -10
```

Shows the last 10 commits in a compact format.

---

## 📊 Version History

| Tag | Date | Description |
|-----|------|-------------|
| MVP.01 | - | Initial deployment |
| MVP.02 | TBD | (Next release) |

---

*Last updated: January 2026*
