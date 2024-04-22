import { Route, Routes as Switch, useLocation } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import withProtected from "./ProtectedRoute";
import Layout from "../views/Layout";
import { AnimatePresence } from "framer-motion";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import Collection from "../views/Collection";
import { ComponentType } from "react";
import Search from "../views/Search";

const Routes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch location={location.pathname}>
        <Route key={"home"} path="/" Component={Layout}>
          <Route index Component={withProtected(Home) as ComponentType<{}>} />
        </Route>
        <Route
          path="/video/:id"
          Component={withProtected(VideoPlayer) as ComponentType<{}>}
        />
        <Route
          path="/collection/:id"
          children={
            <Route
              index
              Component={withProtected(Collection) as ComponentType<{}>}
            />
          }
          Component={Layout}
        />
        <Route
          path="/search"
          Component={Layout}
          children={
            <Route
              index
              Component={withProtected(Search) as ComponentType<{}>}
            />
          }
        />
        <Route key={"login"} path="/login" Component={Login} />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
