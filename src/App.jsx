import { useState } from "react";
import "./main.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Master } from "./component/Allcomponent";
import { Home, ImageCompressor } from "./pages/Allpages";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Master />}>
          <Route index element={<Home />} />
          <Route path="image-compressor" element={<ImageCompressor />} />
        </Route>
      </>
    )
  );
  return (
    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
