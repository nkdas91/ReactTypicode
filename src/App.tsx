import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { appRoutes } from "./config/routes";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="max-w-5xl mx-auto px-10 py-5">
        <Suspense fallback={<div>Loading page...</div>}>
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
