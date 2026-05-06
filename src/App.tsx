import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import UserList from "./pages/users/UserList";
import UserDetails from "./pages/users/UserDetails";
import UserEdit from "./pages/users/UserEdit";
import PostList from "./pages/posts/PostList";
import PostDetails from "./pages/posts/PostDetails";
import PostEdit from "./pages/posts/PostEdit";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import FavouritePosts from "./pages/posts/FavouritePosts";

function App() {
  const [favourites, setFavourites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favourites");
    if (saved) {
      try {
        setFavourites((prev) => [...prev, ...JSON.parse(saved)]);
      } catch {
        setFavourites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

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
      <div className="px-10 py-5 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
          <Route
            path="/posts"
            element={
              <PostList
                favourites={favourites}
                toggleFavourite={toggleFavourite}
              />
            }
          />
          <Route
            path="/posts/:id"
            element={
              <PostDetails
                favourites={favourites}
                toggleFavourite={toggleFavourite}
              />
            }
          />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
          <Route
            path="/posts/favourites"
            element={
              <FavouritePosts
                favourites={favourites}
                toggleFavourite={toggleFavourite}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
