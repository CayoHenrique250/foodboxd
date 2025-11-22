import React from 'react';
import styles from './DailyPage.module.css';
import { FaStar } from 'react-icons/fa';

const logoImg = "/logo-backBlack-horizontal.png";


const dailyData = [
  {
    month: "OUTUBRO",
    items: [
      {
        id: 1,
        day: 15,
        name: "Petit Gateau",
        image: "/dashboard-III.png",
        rating: 3
      },
      {
        id: 2,
        day: 20,
        name: "Milkshake de Maracujá",
        image: "/dashboard-III.png",
        rating: 3
      },
      {
        id: 3,
        day: 21,
        name: "Açai com Morango",
        image: "/dashboard-III.png",
        rating: 3
      }
    ]
  },
  {
    month: "NOVEMBRO",
    items: [
      {
        id: 4,
        day: 5,
        name: "Sushi Platter",
        image: "/dashboard-III.png",
        rating: 3
      },
      {
        id: 5,
        day: 12,
        name: "Ramen Special",
        image: "/dashboard-III.png",
        rating: 3
      }
    ]
  }
];

const IconMenu = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    style={{ width: "20px", height: "20px" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const DailyPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerLogo}>
        <img src={logoImg} alt="Food Boxd Logo" className={styles.logoImage} />
      </header>

      <div className={styles.contentContainer}>
        {dailyData.map((monthData) => (
          <div key={monthData.month} className={styles.monthSection}>
            <div className={styles.monthHeader}>
              <h2 className={styles.monthTitle}>{monthData.month}</h2>
            </div>

            <div className={styles.itemsList}>
              {monthData.items.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.daySquare}>
                    <span className={styles.dayNumber}>{item.day}</span>
                  </div>

                  <div className={styles.itemThumbnail}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.thumbnailImage}
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <div className={styles.itemRating}>
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} className={styles.starIcon} />
                      ))}
                    </div>
                  </div>

                  <button className={styles.menuButton}>
                    <IconMenu />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPage;

