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

const SeguindoPage = () => <div>Tela de Seguindo</div>;
const AmigosPage = () => <div>Tela de Amigos</div>;
const DiarioPage = () => <div>Tela de Diário</div>;
const ListasPage = () => <div>Tela de Listas</div>;
const MinhaListaPage = () => <div>Tela Minha Lista</div>;

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
            element: <AmigosPage />,
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
            element: <ListasPage />,
          },
          {
            path: "minha-lista",
            element: <MinhaListaPage />,
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
