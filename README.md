## Demo React + TypeScript Project

A demo project created to practice my learnings in React and TypeScript.

### Pages

- **Users**
  - User list: Displays all users along with:
    - A link to view their posts
    - A link to edit the user
    - A button to delete the user
    - A link to add a new user
    - A search box to search for users
  - User view: Displays all user details along with:
    - A link to edit the user
    - A button to delete the user
    - A back button to navigate back to Users list
  - User edit: Displays a form to edit a user

- **Posts**
  - Post list: Displays all posts along with:
    - A link to the user who created the post
    - A button to mark the post as favourite
    - A link to edit the post
    - A button to delete the post
    - A dropdown to filter posts by user
    - A dropdown to select the number of records displayed
    - A search box to search for posts
    - A text indicator showing the current record range and total records
    - Pagination controls
  - Post view: Displays the post title, body, and user's name along with:
    - A link to edit the post
    - A button to delete the post
    - A button to mark the post as favourite
    - A list of comments containing:
      - Comment title, body and user's email
      - A button to add a new comment
  - Post edit: Displays a form to edit a post

- **Favourite posts**
  - Favourite posts: Displays all posts marked as favourite with the same features available in the Post List page

- **Home**
  - Displays a pie chart comparing favourite posts vs non-favourite posts

---

### Implementation

- User-related functionalities use local state in App.tsx along with props drilling to share state and functions across components. As a result, actions such as add, edit, and delete are immediately reflected in the UI.
- Post-related functionalities do not use shared local state. Each page fetches its required data directly from the API using custom hooks. Actions like edit and delete send requests successfully, but the changes are not reflected in the UI because the application redirects to the Post View page after an update and to the Post List page after a delete operation, where the data is fetched again from the API. Since the demo API is read-only and does not persist updates, the original data is displayed again. This behavior is intentional for learning purposes and could be improved using shared state management or tools like React / TanStack Query.
- Favourite posts are stored in local storage and managed using local state in App.tsx. This state is shared across the Post List, Post View, Navbar (for displaying count), and Home page (for pie chart generation).
- Notifications are displayed using toast messages. React Context is used to share notification state and related functions.
- Pie charts are implemented using the recharts package.
- Routing is implemented using React Router, styling is done using Tailwind CSS, and icons are provided by Heroicons.

---

### Run

```terminal
cd ReactTypicode
npm install
npm run dev
```

### Setup (for reference)

**Install React + TypeScript + Vite**

```terminal
npm create vite@latest ReactTypicode
```

**Install Tailwind CSS**

```terminal
npm install tailwindcss @tailwindcss/vite
```

**Add the @tailwindcss/vite plugin to the Vite configuration.**

```ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**Add an @import to the CSS file that imports Tailwind CSS.**

```ts
@import "tailwindcss";
```

**Install additional packages**

```terminal
npm install react-router react-router-dom
npm install axios
npm install @heroicons/react
npm install recharts
```
