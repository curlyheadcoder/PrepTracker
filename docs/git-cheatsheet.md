# Git & GitHub Interview Cheatsheet

## 1. Core Git Commands

```bash
# Repository Initialization & Clone
git init                             # Initialize local repository
git clone <url>                      # Clone remote repository

# Status & Staging
git status                           # Check working directory & staging area status
git add .                            # Stage all modified and new files
git add <file>                       # Stage specific file

# Committing & Pushing
git commit -m "feat: add todo CRUD"  # Commit staged changes with message
git push origin main                 # Push local commits to remote main branch
git pull origin main                 # Fetch and merge remote changes

# Branching & Checkout
git branch                           # List local branches
git branch <branch-name>             # Create new branch
git checkout <branch-name>           # Switch to branch
git switch <branch-name>             # Modern command to switch branches
git checkout -b <new-branch>         # Create and switch to new branch

# Remote & Sync
git remote -v                        # View remote repository URLs
git fetch origin                     # Fetch remote changes without merging
```

## 2. Advanced Git Commands & Concepts

```bash
# Stash
git stash                            # Temporarily save uncommitted changes
git stash pop                        # Re-apply stashed changes and remove from stash list

# History & Differences
git log --oneline --graph            # Compact commit history tree
git diff                             # Show un-staged changes
git diff --staged                    # Show staged changes

# Reset & Revert
git reset --soft HEAD~1              # Undo last commit, keep changes staged
git reset --hard HEAD~1              # Undo last commit, discard all changes
git revert <commit-hash>             # Create new commit that undoes specified commit
```

## 3. Important Interview Comparisons

### A. `git merge` vs `git rebase`
- **`git merge`**: Combines two branches by creating a new merge commit. Preserves exact history and branch timeline.
- **`git rebase`**: Moves or applies local commits on top of target branch HEAD. Creates a clean, linear history (rewrites commit hashes).

### B. `git reset` vs `git revert`
- **`git reset`**: Rewrites history by moving the branch reference backward (safe for local unpushed commits; dangerous for shared public branches).
- **`git revert`**: Creates a brand new commit that safely undoes changes without altering existing commit history (safe for shared remote branches).

### C. `git fetch` vs `git pull`
- **`git fetch`**: Downloads remote commits, refs, and files from origin without merging into your local branch.
- **`git pull`**: Performs `git fetch` + `git merge` automatically.
