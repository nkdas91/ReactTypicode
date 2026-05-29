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
    isActive: (pathname) => pathname.startsWith(ROUTES.posts.list),
  },
];
