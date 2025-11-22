import React, { useState, useRef, type MouseEvent } from 'react';
import styles from './ListsPage.module.css';
import { FiArrowRightCircle } from 'react-icons/fi';

const logoImg = "/logo-backBlack-horizontal.png";

const listasData = [
  {
    id: 1,
    title: "Favoritos do Momento",
    count: "13 Restaurantes",
    items: [
      { id: 1, image: "/dashboard-III.png" },
      { id: 2, image: "/dashboard-III.png" },
      { id: 3, image: "/dashboard-III.png" },
      { id: 4, image: "/dashboard-III.png" },
      { id: 5, image: "/dashboard-III.png" },
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  },
  {
    id: 2,
    title: "Pratos para Experimentar",
    count: "8 Pratos",
    items: [
      { id: 6, image: "/dashboard-III.png" },
      { id: 7, image: "/dashboard-III.png" },
      { id: 8, image: "/dashboard-III.png" },
      { id: 9, image: "/dashboard-III.png" },
      { id: 10, image: "/dashboard-III.png" },
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  },
  {
    id: 3,
    title: "Os Melhores Strogonofes",
    count: "3 Pratos",
    items: [
      { id: 11, image: "/dashboard-III.png" },
      { id: 12, image: "/dashboard-III.png" },
      { id: 13, image: "/dashboard-III.png" },
      { id: 14, image: "/dashboard-III.png" },
      { id: 15, image: "/dashboard-III.png" },
      { id: 16, image: "/dashboard-III.png" },
      { id: 17, image: "/dashboard-III.png" },
      
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  },
];

const ListsPage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const startDragging = (e: MouseEvent<HTMLDivElement>, sectionId: number) => {
    const ref = scrollRefs.current[sectionId];
    if (!ref) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.offsetLeft);
    setScrollLeft(ref.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>, sectionId: number) => {
    if (!isDragging) return;
    const ref = scrollRefs.current[sectionId];
    if (!ref) return;
    e.preventDefault();
    const x = e.pageX - ref.offsetLeft;
    const walk = (x - startX) * 2;
    ref.scrollLeft = scrollLeft - walk;
  };

  const setScrollRef = (sectionId: number, element: HTMLDivElement | null) => {
    scrollRefs.current[sectionId] = element;
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerLogo}>
        <img src={logoImg} alt="Food Boxd Logo" className={styles.logoImage} />
      </header>

      <div className={styles.sectionsContainer}>
        {listasData.map((lista) => (
          <section key={lista.id} className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleContainer}>
                <h2 className={styles.sectionTitle}>{lista.title}</h2>
                <span className={styles.sectionCount}>{lista.count}</span>
              </div>
              <FiArrowRightCircle className={styles.arrowIcon} />
            </div>

            <div
              className={styles.horizontalScroll}
              ref={(el) => setScrollRef(lista.id, el)}
              onMouseDown={(e) => startDragging(e, lista.id)}
              onMouseLeave={stopDragging}
              onMouseUp={stopDragging}
              onMouseMove={(e) => onMouseMove(e, lista.id)}
            >
              {lista.items.map((item) => (
                <div key={item.id} className={styles.listCard}>
                  <img
                    src={item.image}
                    alt="Item"
                    className={styles.cardImage}
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              ))}
            </div>

            <p className={styles.sectionDescription}>{lista.description}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ListsPage;

