---
name: mask-email
description: >-
  Maintains @ekaone/mask-email, a zero-dependency TypeScript library for masking,
  anonymizing, and validating email addresses. Use when changing maskEmail,
  maskEmailBatch, validateEmail/isValidEmail, anonymizeEmail/anonymizeEmailBatch,
  EmailOptions/MaskOptions types, domain masking (partial/full), visibleCharsEnd,
  maskPercentage balancing, tests (Vitest), docs (README), or build (tsup).
---

# mask-email

Project skill for maintaining **`@ekaone/mask-email`**.

## Repo map

- **Public entrypoint**: `src/index.ts`
- **Core**: `src/maskEmail.ts`, `src/maskEmailBatch.ts`, `src/validateEmail.ts`, `src/anonymizeEmail.ts`, `src/types.ts`
- **Tests**: `test/*.test.ts` (Vitest)
- **Build**: `tsup.config.ts`

## Quick workflows

### Make a behavior change (safe loop)

1. Update types in `src/types.ts` (if API/options change).
2. Update implementation in `src/*.ts`.
3. Add/adjust tests in `test/*.test.ts` to lock behavior.
4. Update `README.md` examples/API so outputs match reality.
5. Run:
   - `pnpm test`
   - `pnpm typecheck`
   - `pnpm build`

### Add a new `EmailOptions` field

- Add field + doc to `src/types.ts`.
- Implement in `src/maskEmail.ts` with explicit precedence rules (especially vs `maskPercentage`).
- Tests must cover: default (omitted), typical value, edge values (negative/decimal/too-large if applicable).
- Update README options table + at least one example.

### Fix a bug

- Write a failing Vitest test first.
- Fix with minimal surface-area change in `src/`.
- Keep return types and error strings stable unless breaking change is intended.

## Behavioral invariants (must remain true unless breaking change is intended)

### `maskEmail(email, options?)`

- **Input tolerance**: if `email` is falsy or not a string, return it as-is.
- **No `@`**: return input as-is.
- **`viewable: true`**: return input as-is.
- **Multiple `@`**: split on the **last** `@`.
- **`maskChar` fallback**: empty/invalid `maskChar` falls back to `'*'`.
- **`visibleChars` + `visibleCharsEnd`**:
  - clamp negatives to 0
  - floor decimals
  - never exceed username length
- **`maskPercentage` precedence**: when provided, it overrides `visibleChars`/`visibleCharsEnd` and balances visible chars:
  - start = `ceil(charsToShow/2)`
  - end = `floor(charsToShow/2)`
- **Domain masking** (`maskDomain`):
  - `false`: no domain masking
  - `true`/`'partial'`: mask each domain part except TLD by keeping first char and masking the rest
  - `'full'`: mask all domain parts including TLD

### `maskEmailBatch(emails, options?)`

- Applies `maskEmail` to each element (preserve non-email strings unchanged).

### `validateEmail(email, options?)` / `isValidEmail(email)`

- `validateEmail` returns `{ valid, original, masked, error? }`.
- If valid: `masked = maskEmail(email, options)`.
- Keep asserted error messages stable (tests rely on strings like `"Email is required"`, `"Invalid domain"`, `"Invalid email format"`).

### `anonymizeEmail(email, options?)`

- Username becomes `${prefix}_${randomId}`.
- Defaults: `prefix = 'user'`, `idLength = 6`, `maskDomain = true`.
- Random ID should differ between calls (do not make deterministic unless explicitly requested).

## Commands

- Install: `pnpm install`
- Test: `pnpm test` (watch: `pnpm test:watch`)
- Typecheck: `pnpm typecheck`
- Build: `pnpm build`
