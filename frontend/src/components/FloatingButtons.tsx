import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

interface FloatingButton {
  to: string;
  label: string;
}

const profileButtons: FloatingButton[] = [
  { to: "/app/perfil", label: "Perfil" },
  { to: "/app/diario", label: "Diário" },
  { to: "/app/listas", label: "Listas" },
  { to: "/app/minha-lista", label: "Minha Lista" },
];

const buttonsByRoute: Record<string, FloatingButton[]> = {
  "/app/dashboard": [
    { to: "/app/dashboard", label: "Home" },
    { to: "/app/seguindo", label: "Seguindo" },
    { to: "/app/listas", label: "Listas" },
    { to: "/app/recomendacoes", label: "Recomendações" },
  ],
  "/app/amigos": [
    { to: "/app/amigos", label: "Amigos" },
    { to: "/app/voce", label: "Você" },
  ],
  "/app/perfil": profileButtons,
  "/app/diario": profileButtons,
  "/app/listas": profileButtons,
  "/app/minha-lista": profileButtons,
};

export const FloatingButtons: React.FC = () => {
  const location = useLocation();
  const buttons = buttonsByRoute[location.pathname];

  if (!buttons) {
    return null;
  }

  return (
    <div className={styles.floatingButtons}>
      {buttons.map((button) => (
        <NavLink
          key={button.to}
          to={button.to}
          className={({ isActive }) =>
            isActive
              ? `${styles.floatingButton} ${styles.floatingButtonActive}`
              : styles.floatingButton
          }
        >
          {button.label}
        </NavLink>
      ))}
    </div>
  );
};
