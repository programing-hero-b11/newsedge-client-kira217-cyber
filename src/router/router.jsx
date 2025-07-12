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
import PremiumRoutes from "../routes/PremiumRoutes";
import Statistics from "../pages/AdminPages/Statistics/Statistics";
import ManageUsers from "../pages/AdminPages/ManageUsers/ManageUsers";
import ManageArticles from "../pages/AdminPages/ManageArticles/ManageArticles";
import AddPublisher from "../pages/AdminPages/AddPublisher/AddPublisher";
import DashboardProfile from "../pages/AdminPages/DashboardProfile/DashboardProfile";
import UpdateArticle from "../pages/UpdateArticle/UpdateArticle";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import Payment from "../components/PaymentGetway/Payment";
import NotFound from "../pages/ErrorPage/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
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
        element: <AllArticles></AllArticles>,
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
        path: "payment",
        element: (
          <PrivetRoutes>
            <Payment></Payment>
          </PrivetRoutes>
        ),
      },
      {
        path: "premium-articles",
        element: (
          <PrivetRoutes>
            <PremiumRoutes>
              <PremiumArticles></PremiumArticles>
            </PremiumRoutes>
          </PrivetRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivetRoutes>
            <Profile></Profile>
          </PrivetRoutes>
        ),
      },
      {
        path: "update-article/:id",
        element: (
          <PrivetRoutes>
            <UpdateArticle></UpdateArticle>
          </PrivetRoutes>
        ),
      },
      {
        path: "article-details/:id",
        element: (
          <PrivetRoutes>
            <ArticleDetails></ArticleDetails>
          </PrivetRoutes>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  { path: "register", element: <Register></Register> },
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        <AdminRoutes>
          <DashBoardLayouts></DashBoardLayouts>
        </AdminRoutes>
      </PrivetRoutes>
    ),
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: (
          <PrivetRoutes>
            <AdminRoutes>
              <Statistics></Statistics>
            </AdminRoutes>
          </PrivetRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivetRoutes>
            <AdminRoutes>
              <ManageUsers></ManageUsers>
            </AdminRoutes>
          </PrivetRoutes>
        ),
      },
      {
        path: "manage-articles",
        element: (
          <PrivetRoutes>
            <AdminRoutes>
              <ManageArticles></ManageArticles>
            </AdminRoutes>
          </PrivetRoutes>
        ),
      },
      {
        path: "add-publisher",
        element: (
          <PrivetRoutes>
            <AdminRoutes>
              <AddPublisher></AddPublisher>
            </AdminRoutes>
          </PrivetRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivetRoutes>
            <AdminRoutes>
              <DashboardProfile></DashboardProfile>
            </AdminRoutes>
          </PrivetRoutes>
        ),
      },
    ],
  },
]);
