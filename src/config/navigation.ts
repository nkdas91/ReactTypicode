import type { NavbarItem } from "../types/NavbarItem";

import { ROUTES } from "./routePaths";

export const navbarItems: NavbarItem[] = [
  {
    label: "Home",
    to: ROUTES.home,
    isActive: (pathname) => pathname === ROUTES.home,
  },

  {
    label: "Users",
    to: ROUTES.users.list,
    isActive: (pathname) => pathname.startsWith(ROUTES.users.list),
  },

  {
    label: "Posts",
    to: ROUTES.posts.list,
    isActive: (pathname) =>
      pathname.startsWith(ROUTES.posts.list) &&
      !pathname.startsWith(ROUTES.posts.favourites),
  },

  {
    label: "Favourite Posts",
    to: ROUTES.posts.favourites,
    showBadge: true,
    isActive: (pathname) => pathname.startsWith(ROUTES.posts.favourites),
  },
];
