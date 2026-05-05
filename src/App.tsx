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

function App() {
  return (
    <>
      <Navbar />
      <div className="px-10 py-5 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
