import React from 'react';
import styles from './MyListPage.module.css';

const logoImg = "/logo-backBlack-horizontal.png";

const listItems = [
  { id: 1, image: "/dashboard-III.png" },
  { id: 2, image: "/dashboard-III.png" },
  { id: 3, image: "/dashboard-III.png" },
  { id: 4, image: "/dashboard-III.png" },
  { id: 5, image: "/dashboard-III.png" },
  { id: 6, image: "/dashboard-III.png" },
  { id: 7, image: "/dashboard-III.png" },
  { id: 8, image: "/dashboard-III.png" },
  { id: 9, image: "/dashboard-III.png" },
  { id: 10, image: "/dashboard-III.png" },
  { id: 11, image: "/dashboard-III.png" },
  { id: 12, image: "/dashboard-III.png" },
];

const MyListPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerLogo}>
        <img src={logoImg} alt="Food Boxd Logo" className={styles.logoImage} />
      </header>

      <div className={styles.gridContainer}>
        {listItems.map((item) => (
          <div key={item.id} className={styles.gridItem}>
            <img 
              src={item.image} 
              alt="List item" 
              className={styles.thumbnailImage} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListPage;

