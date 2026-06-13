# Contributing Guidelines

Thank you for contributing to this project.

This document outlines the development workflow, coding standards, testing requirements, and pull request expectations to keep the codebase consistent, maintainable, and easy to review.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming](#branch-naming)
- [Commit Guidelines](#commit-guidelines)
- [Code Standards](#code-standards)
- [Component Guidelines](#component-guidelines)
- [API Development Guidelines](#api-development-guidelines)
- [Styling and Design Tokens](#styling-and-design-tokens)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing Requirements](#testing-requirements)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Review Checklist](#review-checklist)
- [Reporting Issues](#reporting-issues)

---

# Getting Started

## Prerequisites

Ensure you have:

- Node.js 24+
- npm 11+

Verify:

```bash
node --version
npm --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/nkdas91/ReactTypicode.git
```

Navigate to the project:

```bash
cd ReactTypicode
```

Install dependencies:

```bash
npm install
```

---

## Environment Setup

Create a local environment file:

```bash
.env
```

Example:

```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

---

## Run the Application

Start development server:

```bash
npm run dev
```

---

# Development Workflow

All changes should follow this workflow:

1. Create a branch from `main`
2. Make focused changes
3. Add or update tests
4. Run validation commands
5. Create a pull request

Example:

```bash
git checkout main
git pull origin main

git checkout -b feature/user-profile
```

---

# Branch Naming

Use descriptive branch names.

## Features

Format:

```
feature/<feature-name>
```

Examples:

```
feature/add-user-search
feature/profile-page
```

---

## Bug Fixes

Format:

```
fix/<bug-name>
```

Examples:

```
fix/api-timeout-handling
fix/form-validation-error
```

---

## Refactoring

Format:

```
refactor/<change-name>
```

Examples:

```
refactor/design-tokens
refactor/api-error-handling
```

---

## Tests

Format:

```
test/<test-area>
```

Examples:

```
test/user-hooks
test/accessibility
```

---

# Commit Guidelines

Write clear and meaningful commit messages.

Use conventional commit format:

```
type: description
```

## Supported Types

| Type     | Usage                         |
| -------- | ----------------------------- |
| feat     | New functionality             |
| fix      | Bug fixes                     |
| refactor | Code restructuring            |
| test     | Adding or updating tests      |
| docs     | Documentation changes         |
| chore    | Tooling/configuration changes |
| perf     | Performance improvements      |

---

## Examples

Good:

```bash
feat: add user details page

fix: handle API timeout errors

refactor: introduce semantic design tokens

test: add accessibility tests for form fields

docs: update contribution guidelines
```

Avoid:

```bash
update stuff

changes

fix bug
```

---

# Code Standards

## TypeScript

Follow strict TypeScript practices.

Prefer:

```ts
const user: User = data;
```

Avoid:

```ts
const user: any = data;
```

Use:

- interfaces/types for contracts
- explicit return types for reusable functions
- meaningful variable names

---

## React Components

Components should:

- have a single responsibility
- avoid unnecessary complexity
- remain reusable
- separate UI from business logic

Example structure:

```
Component
 ├── UI rendering
 ├── Props handling
 └── User interaction
```

---

# Component Guidelines

## File Naming

Use PascalCase:

```
TextField.tsx
UserCard.tsx
Toast.tsx
```

---

## Props

Define explicit prop types:

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}
```

Avoid:

```tsx
function Button(props: any);
```

---

## Accessibility

Every interactive component should consider:

- keyboard navigation
- focus states
- semantic HTML
- ARIA attributes when required

---

# API Development Guidelines

API calls should not be made directly inside components.

Use:

```
Component
    |
React Query Hook
    |
Service Layer
    |
API Client
    |
Axios Instance
```

---

Example:

```tsx
const { data, isLoading } = useUser(id);
```

Components should not know:

- API URLs
- Axios configuration
- request formatting
- error parsing

---

# Error Handling

API errors should use consistent error objects.

Example:

```ts
ApiError {
  message: string;
  status?: number;
}
```

Avoid returning inconsistent error structures.

---

# React Query Guidelines

Queries should:

- use meaningful query keys
- configure stale time appropriately
- support request cancellation
- avoid unnecessary refetching

Example:

```ts
useQuery({
  queryKey: QUERY_KEYS.user(id),
  queryFn,
});
```

---

# Styling and Design Tokens

Use semantic design tokens instead of hardcoded values.

Prefer:

```tsx
className = "bg-primary text-on-primary";
```

Avoid:

```tsx
className = "bg-indigo-700 text-white";
```

---

Design tokens include:

- colors
- spacing
- typography
- radius
- shadows
- focus states

---

# Accessibility Requirements

Accessibility is part of the definition of done.

New UI components should include:

- proper labels
- keyboard support
- visible focus states
- semantic HTML
- screen reader compatibility

---

## Automated Accessibility Testing

Components should include axe tests where appropriate.

Example:

```ts
const results = await axe(container);

expect(results).toHaveNoViolations();
```

---

# Testing Requirements

Before submitting a pull request, ensure all tests pass.

---

## Unit Tests

Run:

```bash
npm run test:run
```

Used for:

- utilities
- hooks
- components
- business logic

---

## Accessibility Tests

Included with component tests.

Verify:

- labels
- roles
- ARIA attributes
- keyboard accessibility

---

## End-to-End Tests

Run:

```bash
npm run test:e2e
```

Used for validating complete user flows.

---

## Coverage

Generate coverage:

```bash
npm run test:coverage
```

---

# Pull Request Guidelines

A pull request should:

- have a clear title
- explain the purpose of the change
- include testing details
- include screenshots for UI changes
- avoid unrelated modifications

---

## Pull Request Title Examples

Good:

```
feat: add user search functionality

fix: handle failed API requests

refactor: migrate components to design tokens
```

---

# Review Checklist

Before requesting review:

## Code Quality

- [ ] TypeScript has no errors
- [ ] ESLint passes
- [ ] Code is formatted
- [ ] No unnecessary duplication

---

## Testing

- [ ] Unit tests pass
- [ ] Accessibility tests pass
- [ ] End-to-end tests pass when applicable

---

## UI Changes

- [ ] Responsive behavior verified
- [ ] Keyboard navigation tested
- [ ] Focus states implemented
- [ ] Design tokens used

---

## API Changes

- [ ] Error handling considered
- [ ] Retry behavior reviewed
- [ ] Loading states handled
- [ ] Request cancellation supported where required

---

# Reporting Issues

When creating an issue, include:

## Bug Reports

- Description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information
- Screenshots or logs if applicable

---

## Feature Requests

Include:

- Problem being solved
- Proposed solution
- Expected user impact
- Possible implementation considerations

---

Thank you for helping improve the project.
