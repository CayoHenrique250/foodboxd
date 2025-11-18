import React from "react";
import { useAuthStore } from "../store/auth.store";
import styles from "./ProfilePage.module.css";

const mockFavoritos = [
  { id: 1, nome: "Carbonara", imagem: "/image-temp.png" },
  { id: 2, nome: "Burger", imagem: "/image-temp.png" },
  { id: 3, nome: "Sushi", imagem: "/image-temp.png" },
  { id: 4, nome: "Pizza", imagem: "/image-temp.png" },
];

const mockAtividadeRecente = [
  { id: 1, nome: "Ramen", imagem: "/image-temp.png" },
  { id: 2, nome: "Tacos", imagem: "/image-temp.png" },
  { id: 3, nome: "Pasta", imagem: "/image-temp.png" },
  { id: 4, nome: "Salad", imagem: "/image-temp.png" },
];

const IconCamera = () => (
  <svg
    style={{ width: "20px", height: "20px" }}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
    />
  </svg>
);

const IconChevronRight = () => (
  <svg
    style={{ width: "20px", height: "20px" }}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
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

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const updateUserPhoto = useAuthStore((state) => state.updateUserPhoto);

  if (!user) {
    return <div className={styles.loading}>Carregando perfil...</div>;
  }

  const handleLogout = () => {
    logout();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const newPhotoUrl = e.target?.result as string;

      if (newPhotoUrl) {
        updateUserPhoto(newPhotoUrl);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <a href="/app/configuracoes" className={styles.settingsIcon}>
            <IconSettings />
          </a>
          <div className={styles.logoContainer}>
            <img
              src="/logo-backBlack-horizontal.png"
              alt="FoodBoxd"
              className={styles.logo}
            />
          </div>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.photoWrapper}>
            <img
              src={
                user.foto ||
                `https://ui-avatars.com/api/?name=${user.name}&background=96300C&color=fff&bold=true&size=200`
              }
              alt="Foto de Perfil"
              className={styles.profilePicture}
            />

            <input
              type="file"
              id="profilePicInput"
              accept="image/png, image/jpeg"
              className={styles.inputHidden}
              onChange={handleFileChange}
            />

            <label htmlFor="profilePicInput" className={styles.uploadLabel}>
              <IconCamera />
            </label>
          </div>

          <h1 className={styles.userName}>
            {user.name} {user.last_name}
          </h1>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Favoritos</h2>
          <button className={styles.seeAllButton} aria-label="Ver todos">
            <IconChevronRight />
          </button>
        </div>

        <div className={styles.gridContainer}>
          {mockFavoritos.map((item) => (
            <div key={item.id} className={styles.gridItem}>
              <img
                src={item.imagem}
                alt={item.nome}
                className={styles.gridImage}
              />
              <div className={styles.gridInfo}>
                <span className={styles.gridRating}>★★★</span>
                <button className={styles.gridMenu}>⋯</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Atividade Recente</h2>
          <button className={styles.seeAllButton} aria-label="Ver todos">
            <IconChevronRight />
          </button>
        </div>

        <div className={styles.gridContainer}>
          {mockAtividadeRecente.map((item) => (
            <div key={item.id} className={styles.gridItem}>
              <img
                src={item.imagem}
                alt={item.nome}
                className={styles.gridImage}
              />
              <div className={styles.gridInfo}>
                <span className={styles.gridRating}>★★★</span>
                <button className={styles.gridMenu}>⋯</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.logoutSection}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair (Logout)
        </button>
      </section>
    </div>
  );
};
