import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { appRoutes } from "./config/routes";

import "./App.css";
import Skeleton from "./components/skeletons/Skeleton";

function App() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="max-w-(--container-content) mx-auto px-10 py-5"
      >
        <Suspense fallback={<Skeleton />}>
          <Routes>
            {appRoutes().map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
