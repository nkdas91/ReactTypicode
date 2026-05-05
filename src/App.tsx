import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import UserList from "./pages/users/UserList";
import UserDetails from "./pages/users/UserDetails";
import UserEdit from "./pages/users/UserEdit";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-10 py-5 ">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
