import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-10 py-5 ">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
