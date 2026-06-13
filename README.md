# React TypeScript Application

A production-ready React application built with modern frontend engineering practices.

The project focuses on **maintainability, scalability, accessibility, performance, and developer experience** while following industry-standard patterns for API communication, state management, testing, and UI development.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Design Principles](#design-principles)
- [API Architecture](#api-architecture)
- [Error Handling](#error-handling)
- [Retry Strategy](#retry-strategy)
- [Environment Configuration](#environment-configuration)
- [Security](#security)
- [Accessibility](#accessibility)
- [Testing Strategy](#testing-strategy)
- [Available Scripts](#available-scripts)
- [Code Quality](#code-quality)
- [Performance Considerations](#performance-considerations)
- [Local Development Setup](#local-development-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## ✨ Features

- ⚛️ React with TypeScript
- ⚡ Vite-powered development environment
- 🎨 Tailwind CSS v4 with semantic design tokens
- 🔄 Server state management using TanStack React Query
- 🌐 Centralized Axios API layer
- 🧩 Reusable component architecture
- ♿ Accessibility testing with axe
- 🧪 Unit and component testing with Vitest
- 🎭 End-to-end testing with Playwright
- 🔒 Security headers and Content Security Policy
- 📦 Optimized production builds
- 🛡️ Error normalization and retry handling
- 📱 Responsive UI design

---

# Tech Stack

| Technology     | Purpose                 |
| -------------- | ----------------------- |
| React          | UI framework            |
| TypeScript     | Type safety             |
| Vite           | Build tooling           |
| Tailwind CSS   | Styling system          |
| TanStack Query | Server state management |
| Axios          | HTTP client             |
| Vitest         | Unit testing            |
| jest-axe       | Accessibility testing   |
| Playwright     | End-to-end testing      |
| ESLint         | Code quality            |
| Prettier       | Code formatting         |

---

# Architecture

The application follows a feature-oriented architecture:

```
src
├── components        # Reusable UI components
│
├── config            # Application configuration
│
├── constants         # Shared constants
│
├── context           # React context providers
│
├── errors            # Custom error classes and error handling
│
├── hooks             # Custom React hooks
│
├── pages             # Application pages/routes
│
├── schemas           # Validation schemas
│
├── services          # API communication layer
│
├── stores            # Client-side state management
│
├── test              # Test utilities and test setup
│
├── types             # TypeScript type definitions
│
├── utils             # Shared utility functions
│
├── app.css           # Global styles and design tokens
│
├── App.tsx           # Root application component
│
└── main.tsx          # Application entry point
```

---

# Design Principles

## Component Driven Development

UI is built using reusable components with clear responsibilities.

Examples:

- Buttons
- Form controls
- Cards
- Toast notifications
- Layout utilities

Components avoid business logic and remain easy to test.

---

## Semantic Design Tokens

The application uses Tailwind theme tokens instead of scattered styling values.

Example:

```css
--color-primary
--color-danger
--color-border
--spacing-card
--radius-card
--text-body
```

Benefits:

- consistent UI
- easier redesigns
- centralized styling decisions
- better maintainability

---

# API Architecture

API communication is centralized through Axios.

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
   |
Backend API
```

Example:

```ts
const { data } = useUser(userId);
```

The component does not know:

- API URLs
- HTTP methods
- request configuration
- error handling

---

# Error Handling

API errors are normalized into a consistent error type.

Example:

```ts
ApiError {
  message: string;
  status?: number;
}
```

This allows:

- predictable UI handling
- status-based retry decisions
- consistent error messages

---

# Retry Strategy

React Query uses intelligent retry behavior:

- retries temporary failures
- avoids retrying client errors (4xx)
- uses exponential backoff

Example:

```
Request fails
      |
      ↓
Check status code
      |
      ├── 4xx → stop retrying
      |
      └── 5xx/network → retry
```

---

# Environment Configuration

Environment variables are centralized.

Example:

```
VITE_API_BASE_URL=https://api.example.com
```

A fallback API URL is provided for development environments.

---

# Security

The deployment includes security headers:

## Content Security Policy

Restricts:

- scripts
- connections
- images
- styles

Example:

```
default-src 'self'
```

## Additional Headers

- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

---

# Accessibility

Accessibility is treated as a first-class requirement.

Implemented:

- semantic HTML
- keyboard navigation
- ARIA attributes where required
- accessible form controls
- automated axe testing

Example:

```ts
const results = await axe(container);

expect(results).toHaveNoViolations();
```

---

# Testing Strategy

The project uses multiple testing layers.

## Unit Tests

Tools:

- Vitest

Run:

```bash
npm run test
```

---

## Accessibility Tests

Included with component tests:

```bash
npm run test
```

Accessibility checks verify:

- labels
- roles
- keyboard accessibility
- ARIA correctness

---

## End-to-End Tests

Tool:

- Playwright

Run:

```bash
npm run test:e2e
```

Covers real user flows in a browser environment.

---

# Available Scripts

## Development

```bash
npm run dev
```

Starts the development server.

---

## Production Build

```bash
npm run build
```

Creates an optimized production build.

---

## Preview Production Build

```bash
npm run preview
```

---

## Unit Tests

Watch mode:

```bash
npm run test
```

Single run:

```bash
npm run test:run
```

Coverage:

```bash
npm run test:coverage
```

UI mode:

```bash
npm run test:ui
```

---

## End-to-End Tests

```bash
npm run test:e2e
```

---

# Code Quality

The project uses:

- ESLint
- Prettier
- TypeScript strict mode

Before committing:

```bash
npm run lint
```

---

# Performance Considerations

Implemented:

- React Query caching
- request deduplication
- stale time configuration
- request cancellation
- optimized Vite builds

---

# Local Development Setup

## Requirements

- Node.js 24+
- npm 11+

---

## Installation

Clone repository:

```bash
git clone https://github.com/nkdas91/ReactTypicode.git
```

Install dependencies:

```bash
npm install
```

Create environment file:

```
.env
```

Example:

```
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

Start application:

```bash
npm run dev
```

---

# Deployment

The application is configured for deployment on Vercel.

Production deployment includes:

- SPA routing support
- security headers
- CSP configuration
- optimized assets

---

# Contributing

Please read the contribution guidelines before submitting changes:

[Contribution Guidelines](.github/CONTRIBUTING.md)

---

# License

This project is [MIT Licensed](../LICENSE) for demonstration and educational purposes.
