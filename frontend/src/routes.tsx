/* eslint-disable react-refresh/only-export-components */

import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";
import { AppLayout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';

const CadastroPage = () => <div>Tela de Cadastro</div>;

const DashboardPage = () => <div>Tela de Dashboard</div>;
const RecomendacoesPage = () => <div>Tela de Recomendações</div>;
const PesquisaPage = () => <div>Tela de Pesquisa</div>;
const AmigosPage = () => <div>Tela de Amigos</div>;
const PerfilPage = () => <div>Tela de Perfil</div>;
const DiarioPage = () => <div>Tela de Diário</div>;
const ListasPage = () => <div>Tela de Listas</div>;
const MinhaListaPage = () => <div>Tela Minha Lista</div>;

const RootRedirect = () => {
  const { token } = useAuthStore.getState();
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
    element: <CadastroPage />,
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
            element: <DashboardPage />,
          },
          {
            path: "recomendacoes",
            element: <RecomendacoesPage />,
          },

          {
            path: "pesquisa",
            element: <PesquisaPage />,
          },
          {
            path: "amigos",
            element: <AmigosPage />,
          },
          {
            path: "perfil",
            element: <PerfilPage />,
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
