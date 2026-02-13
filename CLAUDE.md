# CLAUDE.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Project Overview

**Peers** is a lightweight desktop application for aggregating and presenting peer feedback in educational settings. It allows instructors to import CSV files containing peer review submissions (e.g. from group project evaluations), then displays aggregated scores and qualitative feedback per student.

The application is built with **Tauri** (Rust backend + React/TypeScript frontend) and processes all data in-memory with no persistent storage.

## Architecture

### Two-Tier Desktop App

```
CSV File → [Tauri IPC] → Rust reads file → Frontend parses & displays
```

- **Rust backend** (`src-tauri/`): Minimal — exists primarily to bypass browser file system restrictions. Handles file I/O via Tauri commands.
- **React frontend** (`src/`): Handles all data parsing, aggregation, and display logic.
- **No database or persistent storage**: Data lives in component state, loaded fresh from CSV each session.

### Frontend Structure

- `src/views/` — React view components: `PeerReviews` (container/router), `LoadCSV`, `Students`, `Feedback`
- `src/data/` — Data models and parsing: `Student`, `Review`, `Submission`, `Answer`, `Question`, `CSVParser`

### Data Flow

CSV → file picker triggers Tauri `read_file` command → CSV parser → `Submission` objects → `Student` objects (singleton-cached by name) with linked `Review` objects → aggregated scores and feedback displayed in the UI.

## Environment

The developer uses **fish shell** in their terminal. However, the Bash tool runs zsh — use POSIX/zsh syntax for tool commands. When providing commands for the user to copy-paste, use fish syntax.

## Build and Run

```bash
yarn install              # Install frontend dependencies
yarn run dev              # Run tauri dev (frontend + backend)
yarn build                # Build frontend only
yarn run tauri build      # Full production build
yarn test                 # Launch tests in watch mode
```

## Core Development Principles

### CRITICAL: Assume Correct, Fail Fast Philosophy

**NEVER implement fallback strategies that mask failures with the primary approach.**

When a component expects a value to be provided:
- **DO NOT** use default values when expecting external input
- **DO NOT** attempt to coerce invalid data to meet expectations
- **DO NOT** provide alternative approaches to return meaningful response when primary approach fails
- **ALWAYS** assume operations will work as expected
- **ALWAYS** raise explicit exceptions and abort execution when validation fails
- **ALWAYS** let failures be visible rather than hiding them

This principle is non-negotiable. Systems should fail fast and explicitly when assumptions are violated rather than attempting to continue with compromised data or behavior.

### Server Interaction Constraints

- **NEVER** start servers or run commands that don't terminate on their own
- **DO NOT** run `yarn run dev`, `yarn start`, or `yarn run tauri dev` yourself
- **ALWAYS** ask the user to validate changes that would typically require running the application
- When validation is needed, explain what changes you've made and ask the user to run the validation steps

### Development Philosophy

- Favor simplicity over abstraction
- Use established libraries rather than custom solutions
- Keep code minimal, readable, and maintainable
- Leverage type systems (TypeScript, Rust's type system) for code clarity
- Focus on correctness over premature optimization

### Commenting Best Practices

- **Code comments should reflect the current state of the code**, not its history
- **Never describe changes or modifications in comments** — use version control for tracking history
- **Write comments for first-time readers** — comments should make sense to someone with no prior knowledge of the codebase
- **Focus on explaining "why" rather than "what"** — the code itself shows what it does
- **Document non-obvious behaviors, edge cases, and design decisions**
- **Remove commented-out code** — rely on version control instead

### Collaborative Problem-Solving Approach

You are an expert software engineer, but you are collaborating with an even more established and brilliant peer. When you encounter:

- Unexpected discoveries during implementation
- Ambiguity in the instructions or requirements
- Uncertainty about the best way to proceed
- Multiple viable approaches with unclear trade-offs
- Complex problems that could benefit from additional perspective

Seek guidance from your peer rather than making assumptions or oversimplifying the problem. Their experience and domain knowledge will lead to better solutions than working through challenges in isolation.

## Context-Specific Guidelines

### Planning and Documentation (Applied when working with .md files)

#### Planning Guidelines
- **NEVER** organize plans by timeline or create time-based schedules (e.g., "Week 1", "Phase 1-2 weeks", "Day 1-3")
- **NEVER** estimate how long tasks will take or provide deadline predictions
- **ALWAYS** organize plans by logical components, dependencies, or functional areas
- **ALWAYS** focus on what needs to be built and how components relate to each other
- **ALWAYS** let the user determine their own timeline and pacing

Present plans as logical sequences of components rather than temporal schedules.

#### Documentation Update Guidelines
- **Always update markdown-based plans when completing tasks** (e.g., TODO.md, implementation plans)
- **Mark each instruction as completed** with a checkmark when finishing work items and rewrite it to be a statement of what was done
- **Include relevant completion context** such as deviations from plan, additional work required, integration challenges
- **Keep completion notes focused** — provide enough detail for future reference without excessive verbosity

## Manual Rules (Triggered explicitly)

### Pre-implementation Evaluation (`@noedit`)

When you need to evaluate before implementing, use `@noedit`:
- Evaluate the request first
- Check relevant documentation to understand the behavior of relevant libraries and APIs
- Explain your understanding of the situation and propose a solution
- Do not make any edits until the user has reviewed your proposal

### Commit Message Guidelines (`@commit`)

When generating commit messages, use `@commit`:
- Write commit messages with a clear subject line that has a capitalized first word
- Do not include tags, labels, or prefixes (like "feat:", "fix:", etc.)
- Never reference phases, steps, or parts of a plan (like "Phase 1", "Step 2", "Part A")
- State the purpose of the change clearly in the subject
- Include a short overview below the subject line
- Add point-form notes about specific changes
- Always describe changes in isolation, focusing on what was implemented rather than project timeline
- **Commit messages should never be more than 15 lines and ideally will be closer to 3-5 lines**
