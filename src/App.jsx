import { RouterProvider, Outlet, createBrowserRouter } from "react-router";

import Header from "./components/header";
import Home from "./components/home";

import "./App.css";

function LayoutContext() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <LayoutContext />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
