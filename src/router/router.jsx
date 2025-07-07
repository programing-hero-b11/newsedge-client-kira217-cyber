import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AddArticle from "../pages/AddArticle/AddArticle";
import AllArticles from "../pages/AllArticles/AllArticles";
import Subscription from "../pages/Subscription/Subscription";
import MyArticles from "../pages/MyArticles/MyArticles";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import PrivetRoutes from "../routes/PrivetRoutes";
import DashBoardLayouts from "../layouts/DashBoardLayout";
import AdminRoutes from "../routes/AdminRoutes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "add-article",
        element: (
          <PrivetRoutes>
            <AddArticle></AddArticle>
          </PrivetRoutes>
        ),
      },
      {
        path: "all-articles",
        element: (
          <PrivetRoutes>
            <AllArticles></AllArticles>
          </PrivetRoutes>
        ),
      },
      {
        path: "subscription",
        element: (
          <PrivetRoutes>
            <Subscription></Subscription>
          </PrivetRoutes>
        ),
      },
      {
        path: "my-articles",
        element: (
          <PrivetRoutes>
            <MyArticles></MyArticles>
          </PrivetRoutes>
        ),
      },
      {
        path: "premium-articles",
        element: (
          <PrivetRoutes>
            <PremiumArticles></PremiumArticles>
          </PrivetRoutes>
        ),
      },
      {
        path:"profile",
        element:<PrivetRoutes>
          <Profile></Profile>
        </PrivetRoutes>
      }
    ],
  },
  {
    path:"login",
    element:<Login></Login>
  },
  {path:"register",
    element:<Register></Register>
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        <AdminRoutes>
          <DashBoardLayouts></DashBoardLayouts>
        </AdminRoutes>
      </PrivetRoutes>
    ),
  },
]);
