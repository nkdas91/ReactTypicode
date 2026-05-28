import { Route, Routes } from "react-router-dom";
import "./App.css";
import RouteErrorBoundary from "./components/ErrorBoundary/RouteErrorBoundary";
import Navbar from "./components/navbar/Navbar";
import useLocalStorage from "./hooks/posts/useLocalStorage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import FavouritePosts from "./pages/posts/FavouritePosts";
import PostDetails from "./pages/posts/PostDetails";
import PostEdit from "./pages/posts/PostEdit";
import PostList from "./pages/posts/PostList";
import UserCreate from "./pages/users/UserCreate";
import UserDetails from "./pages/users/UserDetails";
import UserEdit from "./pages/users/UserEdit";
import UserList from "./pages/users/UserList";

function App() {
  const [favourites, setFavourites] = useLocalStorage<number[]>(
    "favourites",
    [],
  );

  const toggleFavourite = (id: number) => {
    setFavourites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((f) => f !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <>
      <Navbar favouriteCount={favourites.length} />
      <div className="px-10 py-5">
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load home page.">
                  <Home likedPostIds={favourites} />
                </RouteErrorBoundary>
              }
            />

            <Route
              path="/users"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load users.">
                  <UserList />
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/users/create"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load add user form.">
                  <UserCreate />
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/users/:id"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load user.">
                  <UserDetails />
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/users/:id/edit"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load edit user form.">
                  <UserEdit />
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/posts"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load posts.">
                  <PostList
                    favourites={favourites}
                    toggleFavourite={toggleFavourite}
                  />
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/posts/:id"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load post.">
                  <PostDetails
                    favourites={favourites}
                    toggleFavourite={toggleFavourite}
                  />
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/posts/:id/edit"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load edit post form.">
                  <PostEdit />
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/posts/favourites"
              element={
                <RouteErrorBoundary fallbackMessage="Failed to load favourite posts.">
                  <FavouritePosts
                    favourites={favourites}
                    toggleFavourite={toggleFavourite}
                  />
                </RouteErrorBoundary>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
