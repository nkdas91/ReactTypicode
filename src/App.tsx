import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { appRoutes } from "./config/routes";
import useLocalStorage from "./hooks/posts/useLocalStorage";

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
          <Suspense fallback={<div>Loading page...</div>}>
            <Routes>
              {appRoutes({
                favourites,
                toggleFavourite,
              }).map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
