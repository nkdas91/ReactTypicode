import "./App.css";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-10 py-5 ">
        <UserList />
      </div>
    </>
  );
}

export default App;
