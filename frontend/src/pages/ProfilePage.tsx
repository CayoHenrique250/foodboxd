import React from "react";
import { useAuthStore } from "../store/auth.store";
import styles from "./ProfilePage.module.css";

const mockPratosFavoritos = [
  { id: 1, nome: "Carbonara Perfeito", restaurante: "Bella Italia" },
  { id: 2, nome: "Burger Clássico", restaurante: "Top Burger" },
  { id: 3, nome: "Sushi de Salmão", restaurante: "Sushi D'or" },
];

const mockStats = {
  avaliacoes: 24,
  listas: 5,
  seguindo: 12,
};

const IconPlate = () => (
  <svg
    className={styles.listItemIcon}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const IconEdit = () => (
  <svg
    style={{ width: "20px", height: "20px" }}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.82a2.25 2.25 0 01-1.06.61l-2.752.825a.75.75 0 01-.976-.976l.825-2.752a2.25 2.25 0 01.61-1.06l11.25-11.25zM16.862 4.487L19.5 7.125m-8.25 8.25L5.25 19.5"
    />
  </svg>
);

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const updateUserPhoto = useAuthStore((state) => state.updateUserPhoto);

  if (!user) {
    return <div>Carregando perfil...</div>;
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
        console.log("Imagem convertida para Base64 e guardada no store.");
        updateUserPhoto(newPhotoUrl);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerCover}></div>

        <div className={styles.headerContent}>
          <div className={styles.photoWrapper}>
            <img
              src={
                user.foto ||
                `https://ui-avatars.com/api/?name=${user.name}&background=e91e63&color=fff&bold=true`
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
              <IconEdit />
            </label>
          </div>

          <h1 className={styles.userName}>
            {user.name} {user.last_name}
          </h1>
          <span className={styles.userHandle}>@{user.username}</span>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <div className={styles.statBox}>
          <span className={styles.statNumber}>{mockStats.avaliacoes}</span>
          <span className={styles.statLabel}>Avaliações</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumber}>{mockStats.listas}</span>
          <span className={styles.statLabel}>Listas</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumber}>{mockStats.seguindo}</span>
          <span className={styles.statLabel}>Seguindo</span>
        </div>
      </section>

      <section>
        <div className={styles.listCard}>
          <h2 className={styles.listTitle}>Pratos Favoritos</h2>

          <div>
            {mockPratosFavoritos.map((prato) => (
              <div key={prato.id} className={styles.listItem}>
                <div className={styles.listItemIcon}>
                  <IconPlate />
                </div>
                <div className={styles.listItemContent}>
                  <h3 className={styles.listItemTitle}>{prato.nome}</h3>
                  <p className={styles.listItemSubtitle}>{prato.restaurante}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.logoutButtonSection}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair (Logout)
        </button>
      </section>
    </div>
  );
};
