import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useNotification } from "./context/NotificationContext";
import useUsers from "./hooks/useUsers";
import Home from "./pages/Home";
import FavouritePosts from "./pages/posts/FavouritePosts";
import PostDetails from "./pages/posts/PostDetails";
import PostEdit from "./pages/posts/PostEdit";
import PostList from "./pages/posts/PostList";
import UserCreate from "./pages/users/UserCreate";
import UserDetails from "./pages/users/UserDetails";
import UserEdit from "./pages/users/UserEdit";
import UserList from "./pages/users/UserList";
import { createUser, deleteUser, updateUser } from "./services/userService";
import type { User } from "./types/User";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const [favourites, setFavourites] = useState<number[]>([]);
  const { data: usersFromApi, loading } = useUsers();
  const { showNotification } = useNotification();

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

  const handleDeleteUser = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    if (!users) return;

    const res = await deleteUser(id);

    if (res.data) {
      setUsers((prev) => prev?.filter((u) => u.id !== id) ?? []);
      showNotification("User deleted");
    } else if (res.error) {
      showNotification(res.error, "error");
    }
  };

  const handleUpdateUser = async (form: User | null, id: number) => {
    if (!form || !users) return;

    const res = await updateUser(id, form);

    if (res.data) {
      const updatedUser = res.data;
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
      showNotification("User updated");
    } else if (res.error) {
      showNotification(res.error, "error");
    }
  };

  const handleCreateUser = async (form: User | null) => {
    if (!form) return;

    const res = await createUser(form);

    if (res.data) {
      const newUser = res.data;
      setUsers((prev) => [...prev, newUser]);
      showNotification("User added");
    } else if (res.error) {
      showNotification(res.error, "error");
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
                onDelete={handleDeleteUser}
              />
            }
          />
          <Route
            path="/users/create"
            element={<UserCreate onSubmit={handleCreateUser} />}
          />
          <Route
            path="/users/:id"
            element={
              <UserDetails
                users={users}
                isLoading={loading}
                onDelete={handleDeleteUser}
              />
            }
          />
          <Route
            path="/users/:id/edit"
            element={
              <UserEdit
                users={users}
                isLoading={loading}
                onSubmit={handleUpdateUser}
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
