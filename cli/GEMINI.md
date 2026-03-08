# Simple Icons CLI - Gemini Context

## Project Overview

This project is a Command Line Interface (CLI) for [Simple Icons](https://simpleicons.org/), built using **TypeScript**, **React**, and **Ink**. It provides both a direct command execution mode and an interactive menu-driven interface.

### Main Technologies

- **Ink**: React for interactive command-line apps.
- **React**: Component-based UI logic.
- **Meow**: CLI argument parsing.
- **TypeScript**: Static typing and modern JS features.
- **Bun**: Used as the primary task runner and development environment.

### Architecture

- `src/cli.tsx`: The entry point. It parses flags using `meow` and decides whether to render a specific command from `src/commands/` or the main interactive `App` from `src/app.tsx`.
- `src/app.tsx`: The root component for the interactive mode, managing state and navigation between different features.
- `src/commands/`: Contains React components for standalone CLI commands (e.g., `find`, `get`, `list`).
- `src/components/`: Reusable UI components and interactive feature logic (e.g., `SelectInput`, `Find` component with state).

## Building and Running

### Development

To run the CLI in development mode using Bun:

```bash
bun run dev
```

### Build

To compile the TypeScript source to JavaScript:

```bash
bun run build
```

The output is generated in the `dist/` directory.

### Testing and Quality

- **Type Checking**: `bun run typecheck`
- **Linting**: `bun run lint` (runs ESLint)
- **Formatting**: `bun run format` (runs Prettier)
- **All-in-one check**: `bun run prebuild` (runs format, lint:fix, and typecheck)

## Development Conventions

### Coding Style

- **TypeScript**: All source files should be written in TypeScript (`.ts` or `.tsx`).
- **Functional Components**: Use React functional components with hooks for UI logic.
- **Ink Best Practices**: Utilize Ink-specific components (`Box`, `Text`, `useInput`) for terminal rendering.
- **Custom Input Handling**: The project uses a custom `SelectInput` in `src/components/select-input.tsx` to avoid common bugs with event listener re-registration in `ink-select-input`.

### Contribution Guidelines

- Ensure all changes pass the `typecheck` and `lint` scripts before committing.
- Use `bun run format` to maintain consistent code style.
- When adding new CLI flags, update both `src/cli.tsx` and the corresponding logic in `src/app.tsx` if it should also be available in interactive mode.
