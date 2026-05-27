import type { NavbarItem } from "../types/NavbarItem";

export const navbarItems: NavbarItem[] = [
  {
    label: "Home",
    to: "/",
    isActive: (pathname) => pathname === "/",
  },
  {
    label: "Users",
    to: "/users",
    isActive: (pathname) => pathname.startsWith("/users"),
  },
  {
    label: "Posts",
    to: "/posts",
    isActive: (pathname) =>
      pathname.startsWith("/posts") &&
      !pathname.startsWith("/posts/favourites"),
  },
  {
    label: "Favourite Posts",
    to: "/posts/favourites",
    showBadge: true,
    isActive: (pathname) => pathname.startsWith("/posts/favourites"),
  },
];
