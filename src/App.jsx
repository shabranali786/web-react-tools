import { useState } from "react";
import "./main.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Master } from "./component/Allcomponent";
import { Home } from "./pages/Allpages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Master />}>
          <Route index element={<Home />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
