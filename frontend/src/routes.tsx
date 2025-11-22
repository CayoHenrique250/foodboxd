/* eslint-disable react-refresh/only-export-components */

import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";
import { AppLayout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from './pages/ProfilePage';
import SearchPage from "./pages/SearchPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import Dashboard from "./pages/Dashboard";
import FriendsPage from "./pages/FriendsPage";
import ListsPage from "./pages/ListsPage";
import MyListPage from "./pages/MyListPage";

const SeguindoPage = () => <div>Tela de Seguindo</div>;
const DiarioPage = () => <div>Tela de Diário</div>;

const RootRedirect = () => {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to="/app/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cadastro",
    element: <RegisterPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "seguindo",
            element: <SeguindoPage />,
          },
          {
            path: "recomendacoes",
            element: <RecommendationsPage/>,
          },

          {
            path: "pesquisa",
            element: <SearchPage />,
          },
          {
            path: "amigos",
            element: <FriendsPage/>,
          },
          {
            path: "perfil",
            element: <ProfilePage />,
          },
          {
            path: "diario",
            element: <DiarioPage />,
          },
          {
            path: "listas",
            element: <ListsPage />,
          },
          {
            path: "minha-lista",
            element: <MyListPage />,
          },
          {
            index: true,
            element: <Navigate to="/app/dashboard" replace />,
          },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <RootRedirect />,
  },
]);
