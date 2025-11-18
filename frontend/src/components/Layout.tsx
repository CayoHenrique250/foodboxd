import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { FloatingButtons } from "./FloatingButtons";

export const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.appContainer}>
      <aside
        className={`${styles.sidebar} ${
          isSidebarCollapsed ? styles.sidebarCollapsed : ""
        }`}
      >
        <button className={styles.hamburgerButton} onClick={toggleSidebar}>
          <IconMenu />
        </button>

        <nav className={styles.sidebarNav}>
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              isActive
                ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                : styles.sidebarLink
            }
            title="Início"
          >
            <IconHome />
            {!isSidebarCollapsed && (
              <span className={styles.sidebarLabel}>Início</span>
            )}
          </NavLink>

          <NavLink
            to="/app/pesquisa"
            className={({ isActive }) =>
              isActive
                ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                : styles.sidebarLink
            }
            title="Pesquisa"
          >
            <IconSearch />
            {!isSidebarCollapsed && (
              <span className={styles.sidebarLabel}>Pesquisa</span>
            )}
          </NavLink>

          <NavLink
            to="/app/review"
            className={({ isActive }) =>
              isActive
                ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                : styles.sidebarLink
            }
            title="Review"
          >
            <IconReview />
            {!isSidebarCollapsed && (
              <span className={styles.sidebarLabel}>Review</span>
            )}
          </NavLink>

          <NavLink
            to="/app/amigos"
            className={({ isActive }) =>
              isActive
                ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                : styles.sidebarLink
            }
            title="Amigos"
          >
            <IconFriends />
            {!isSidebarCollapsed && (
              <span className={styles.sidebarLabel}>Amigos</span>
            )}
          </NavLink>

          <NavLink
            to="/app/perfil"
            className={({ isActive }) =>
              isActive
                ? `${styles.sidebarLink} ${styles.sidebarLinkActive}`
                : styles.sidebarLink
            }
            title="Perfil"
          >
            <IconProfile />
            {!isSidebarCollapsed && (
              <span className={styles.sidebarLabel}>Perfil</span>
            )}
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <NavLink
            to="/app/configuracoes"
            className={styles.settingsButton}
            title="Configurações"
          >
            <IconSettings />
            {!isSidebarCollapsed && (
              <span className={styles.sidebarLabel}>Configurações</span>
            )}
          </NavLink>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileTopBar}>
            <NavLink to="/app/configuracoes" className={styles.mobileSettingsIcon}>
              <IconSettings />
            </NavLink>
            <div className={styles.mobileLogoContainer}>
              <img
                src="/logo-backBlack-horizontal.png"
                alt="FoodBoxd"
                className={styles.mobileLogo}
              />
            </div>
          </div>
        </div>

        <FloatingButtons />
        
        <Outlet />
      </main>

      <nav className={styles.bottomNav}>
        {mobileNavLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? `${styles.bottomNavLink} ${styles.bottomNavLinkActive}`
                : styles.bottomNavLink
            }
          >
            {link.icon}
            <span className={styles.bottomNavLabel}>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const IconMenu = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const IconHome = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);

const IconSearch = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

const IconReview = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconFriends = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
    />
  </svg>
);

const IconProfile = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

const IconSettings = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const mobileNavLinks = [
  { to: "/app/dashboard", label: "Início", icon: <IconHome /> },
  { to: "/app/pesquisa", label: "Pesquisa", icon: <IconSearch /> },
  { to: "/app/review", label: "Review", icon: <IconReview /> },
  { to: "/app/amigos", label: "Amigos", icon: <IconFriends /> },
  { to: "/app/perfil", label: "Perfil", icon: <IconProfile /> },
];
