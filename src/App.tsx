import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import useUsers from "./hooks/useUsers";
import Home from "./pages/Home";
import FavouritePosts from "./pages/posts/FavouritePosts";
import PostDetails from "./pages/posts/PostDetails";
import PostEdit from "./pages/posts/PostEdit";
import PostList from "./pages/posts/PostList";
import UserDetails from "./pages/users/UserDetails";
import UserEdit from "./pages/users/UserEdit";
import UserList from "./pages/users/UserList";
import { createUser, deleteUser, updateUser } from "./services/userService";
import type { User } from "./types/User";
import UserCreate from "./pages/users/UserCreate";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);
  const { data: usersFromApi, loading } = useUsers();

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

  useEffect(() => {
    setUsers(usersFromApi);
  }, [usersFromApi]);

  const toggleFavourite = (id: number) => {
    setFavourites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((f) => f !== id);
      }
      return [...prev, id];
    });
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    if (!users) return;

    const res = await deleteUser(id);

    if (res.data) {
      setUsers((prev) => prev?.filter((u) => u.id !== id) ?? []);
    } else if (res.error) {
      console.log(res.error);
    }
  };

  const handleSubmit = async (
    e: React.SubmitEvent,
    form: User | null,
    id: number,
  ) => {
    e.preventDefault();

    if (!form || !users) return;

    const res = await updateUser(id, form);

    if (res.data) {
      const updatedUser = res.data;
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
    } else if (res.error) {
      console.log(res.error);
    }
  };

  const handleCreate = async (form: User | null) => {
    if (!form) return;

    const res = await createUser(form);

    if (res.data) {
      const newUser = res.data;
      setUsers((prev) => [...prev, newUser]);
    } else if (res.error) {
      console.log(res.error);
    }
  };

  return (
    <>
      <Navbar favouriteCount={favourites.length} />
      <div className="px-10 py-5 ">
        <Routes>
          <Route path="/" element={<Home favouritePosts={favourites} />} />
          <Route
            path="/users"
            element={
              <UserList
                users={users}
                isLoading={loading}
                onDelete={handleDelete}
              />
            }
          />
          <Route
            path="/users/create"
            element={<UserCreate onSubmit={handleCreate} />}
          />
          <Route
            path="/users/:id"
            element={
              <UserDetails
                users={users}
                isLoading={loading}
                onDelete={handleDelete}
              />
            }
          />
          <Route
            path="/users/:id/edit"
            element={
              <UserEdit
                users={users}
                isLoading={loading}
                onSubmit={handleSubmit}
              />
            }
          />
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
