import { lazy } from "react";

export const Home = lazy(() => import("../pages/Home"));

export const UserList = lazy(() => import("../pages/users/UserList"));

export const UserCreate = lazy(() => import("../pages/users/UserCreate"));

export const UserDetails = lazy(() => import("../pages/users/UserDetails"));

export const UserEdit = lazy(() => import("../pages/users/UserEdit"));

export const PostList = lazy(() => import("../pages/posts/PostList"));

export const PostDetails = lazy(() => import("../pages/posts/PostDetails"));

export const PostEdit = lazy(() => import("../pages/posts/PostEdit"));

export const NotFound = lazy(() => import("../pages/NotFound"));
