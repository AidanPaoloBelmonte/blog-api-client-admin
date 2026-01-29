import { useState, useEffect } from "react";
import {
  RouterProvider,
  Outlet,
  createBrowserRouter,
  useNavigate,
  useLocation,
} from "react-router";
import { useCookies } from "react-cookie";

import Header from "./components/header";
import Home from "./components/home";
import Login from "./components/login";
import User from "./components/user";
import Blogs from "./components/blogs";
import BlogPost from "./components/blogPost";
import NewBlog from "./components/newBlog";

import "./App.css";

function LayoutContext() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(cookies?.user);

  useEffect(() => {
    async function redirect() {
      if (!user && location.pathname != "/login") {
        await navigate("/login", { viewTransition: true });
      }
    }

    redirect();
  }, [location.pathname, navigate, user]);

  return (
    <>
      <Header
        key={user?.id ?? "none"}
        removeCookie={removeCookie}
        user={user}
        setUser={setUser}
      />
      <Outlet context={{ cookies, setCookie, removeCookie, user, setUser }} />
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
      {
        path: "/user/:id",
        element: <User></User>,
      },
      {
        path: "/new",
        element: <NewBlog></NewBlog>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blogs/:id",
        element: <BlogPost></BlogPost>,
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
