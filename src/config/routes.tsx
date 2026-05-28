import type { ReactNode } from "react";

import RouteErrorBoundary from "../components/ErrorBoundary/RouteErrorBoundary";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import FavouritePosts from "../pages/posts/FavouritePosts";
import PostDetails from "../pages/posts/PostDetails";
import PostEdit from "../pages/posts/PostEdit";
import PostList from "../pages/posts/PostList";

import UserCreate from "../pages/users/UserCreate";
import UserDetails from "../pages/users/UserDetails";
import UserEdit from "../pages/users/UserEdit";
import UserList from "../pages/users/UserList";

import { ROUTES } from "./routePaths";

const withErrorBoundary = (element: ReactNode, fallbackMessage: string) => (
  <RouteErrorBoundary fallbackMessage={fallbackMessage}>
    {element}
  </RouteErrorBoundary>
);

interface AppRoutesProps {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

export const appRoutes = ({ favourites, toggleFavourite }: AppRoutesProps) => [
  {
    path: ROUTES.home,
    element: withErrorBoundary(
      <Home likedPostIds={favourites} />,
      "Failed to load home page.",
    ),
  },

  {
    path: ROUTES.users.list,
    element: withErrorBoundary(<UserList />, "Failed to load users."),
  },

  {
    path: ROUTES.users.create,
    element: withErrorBoundary(<UserCreate />, "Failed to load add user form."),
  },

  {
    path: ROUTES.users.details(),
    element: withErrorBoundary(<UserDetails />, "Failed to load user."),
  },

  {
    path: ROUTES.users.edit(),
    element: withErrorBoundary(<UserEdit />, "Failed to load edit user form."),
  },

  {
    path: ROUTES.posts.list,
    element: withErrorBoundary(
      <PostList favourites={favourites} toggleFavourite={toggleFavourite} />,
      "Failed to load posts.",
    ),
  },

  {
    path: ROUTES.posts.details(),
    element: withErrorBoundary(
      <PostDetails favourites={favourites} toggleFavourite={toggleFavourite} />,
      "Failed to load post.",
    ),
  },

  {
    path: ROUTES.posts.edit(),
    element: withErrorBoundary(<PostEdit />, "Failed to load edit post form."),
  },

  {
    path: ROUTES.posts.favourites,
    element: withErrorBoundary(
      <FavouritePosts
        favourites={favourites}
        toggleFavourite={toggleFavourite}
      />,
      "Failed to load favourite posts.",
    ),
  },

  {
    path: "*",
    element: withErrorBoundary(<NotFound />, "Failed to load page."),
  },
];
