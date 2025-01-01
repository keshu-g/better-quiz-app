import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home, Quiz, Result } from "./pages";
import Layout from "./Layout";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Result />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // {/* </StrictMode> */}
);
