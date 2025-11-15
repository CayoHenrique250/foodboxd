import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div style={styles.appContainer}>
      
      <main style={styles.mainContent}>
        <Outlet />
      </main>

      <nav style={styles.navBar}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) =>
              isActive
                ? { ...styles.navLink, ...styles.navLinkActive }
                : styles.navLink
            }
          >
            {link.icon}
            <span style={styles.navLabel}>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#f9f9f9', 
  },
  mainContent: {
    flex: 1, 
    overflowY: 'auto', 
    padding: '16px',
    paddingBottom: '80px',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '64px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e0e0e0',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    boxShadow: '0 -2px 5px rgba(0,0,0,0.05)',
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: '#9e9e9e',
    flexGrow: 1,
    height: '100%',
    transition: 'color 0.2s ease',
  },
  navLinkActive: {
    color: '#e91e63',
  },
  navLabel: {
    fontSize: '10px',
    marginTop: '4px',
  },
};

const IconHome = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const IconSearch = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const IconDiary = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconList = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

const IconProfile = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={24} height={24}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const navLinks = [
  { to: '/app/dashboard', label: 'Início', icon: <IconHome /> },
  { to: '/app/pesquisa', label: 'Pesquisa', icon: <IconSearch /> },
  { to: '/app/diario', label: 'Diário', icon: <IconDiary /> },
  { to: '/app/listas', label: 'Listas', icon: <IconList /> },
  { to: '/app/perfil', label: 'Perfil', icon: <IconProfile /> },
];