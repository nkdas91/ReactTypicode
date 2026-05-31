import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { appRoutes } from "./config/routes";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <div className="max-w-5xl mx-auto">
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
        </div>
      </div>
    </>
  );
}

export default App;
