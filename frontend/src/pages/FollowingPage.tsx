import React, { useState, useMemo } from "react";
import styles from "./FollowingPage.module.css";
import { FiSearch } from "react-icons/fi";

const logoImg = "/logo-backBlack-horizontal.png";

interface FollowingUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

const mockFollowing: FollowingUser[] = [
  {
    id: "1",
    name: "Maria Silva",
    username: "maria_silva",
    avatar: "https://i.pravatar.cc/150?u=maria",
  },
  {
    id: "2",
    name: "Carlos Santos",
    username: "carlos_santos",
    avatar: "https://i.pravatar.cc/150?u=carlos",
  },
  {
    id: "3",
    name: "Ana Costa",
    username: "ana_costa",
    avatar: "https://i.pravatar.cc/150?u=ana",
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    username: "pedro_oliveira",
    avatar: "https://i.pravatar.cc/150?u=pedro",
  },
  {
    id: "5",
    name: "Lucia Ferreira",
    username: "lucia_ferreira",
    avatar: "https://i.pravatar.cc/150?u=lucia",
  },
  {
    id: "6",
    name: "Rafael Almeida",
    username: "rafael_almeida",
    avatar: "https://i.pravatar.cc/150?u=rafael",
  },
  {
    id: "7",
    name: "Julia Rodrigues",
    username: "julia_rodrigues",
    avatar: "https://i.pravatar.cc/150?u=julia",
  },
  {
    id: "8",
    name: "Gabriel Lima",
    username: "gabriel_lima",
    avatar: "https://i.pravatar.cc/150?u=gabriel",
  },
];

const FollowingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFollowing = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockFollowing;
    }

    const query = searchQuery.toLowerCase();
    return mockFollowing.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleUnfollow = (userId: string) => {
    console.log("Deixar de seguir:", userId);
  };

  const handleUserClick = (userId: string) => {
    console.log("Ver perfil do usuário:", userId);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerLogo}>
        <img src={logoImg} alt="Food Boxd" className={styles.logoImage} />
      </header>

      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Pesquisar pessoas que você segue"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.followingList}>
        {filteredFollowing.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum resultado encontrado</p>
          </div>
        ) : (
          filteredFollowing.map((user) => (
            <div key={user.id} className={styles.followingItem}>
              <div
                className={styles.userInfo}
                onClick={() => handleUserClick(user.id)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.avatar}
                />
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userUsername}>@{user.username}</span>
                </div>
              </div>
              <button
                className={styles.unfollowButton}
                onClick={() => handleUnfollow(user.id)}
              >
                Seguindo
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowingPage;
