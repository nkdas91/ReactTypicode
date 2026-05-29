export const ROUTES = {
  home: "/",

  users: {
    list: "/users",
    create: "/users/create",
    details: (id: string | number = ":id") => `/users/${id}`,
    edit: (id: string | number = ":id") => `/users/${id}/edit`,
  },

  posts: {
    list: "/posts",
    details: (id: string | number = ":id") => `/posts/${id}`,
    edit: (id: string | number = ":id") => `/posts/${id}/edit`,
  },
} as const;
