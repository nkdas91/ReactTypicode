### Install React + TypeScript + Vite

`npm create vite@latest posts`

### Install tailwind

npm install tailwindcss @tailwindcss/vite

**Add the @tailwindcss/vite plugin to your Vite configuration.**

```ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**Add an @import to your CSS file that imports Tailwind CSS.**

```ts
@import "tailwindcss";
```
