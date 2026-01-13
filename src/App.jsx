import { RouterProvider, Outlet, createBrowserRouter } from "react-router";

import Header from "./components/header";
import Home from "./components/home";
import Login from "./components/login";

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
      {
        path: "/login",
        element: <Login></Login>,
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
