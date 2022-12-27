import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Main = lazy(() => import("../Main"));
const NotFound = lazy(() => import("../NotFound"));

export default function RoutesList() {
  return useRoutes([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
}
