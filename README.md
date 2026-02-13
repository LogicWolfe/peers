# Peers

A desktop tool for aggregating peer feedback from group projects. Import a CSV where each row is one student's review of their teammates — scores for communication, supportiveness, and report contributions, plus free-text comments — and Peers compiles it into per-student feedback summaries.

For each student you get:
- Averaged scores across all their reviewers
- Compiled list of valued contributions and areas for improvement (randomized so comments aren't attributable to specific reviewers)
- List of who reviewed them

Nothing is stored. Data lives in memory for the session and is discarded when you close the app or import a new file.

## Development

Built with Tauri v2 (Rust backend + React/TypeScript frontend).

```
yarn install          # Install frontend dependencies
yarn dev              # Run the app in development mode (frontend + Tauri backend)
yarn test             # Run tests
yarn test:watch       # Run tests in watch mode
yarn run tauri build  # Production build
```

## License

MIT
