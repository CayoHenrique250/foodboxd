import React, { useState, useRef, type MouseEvent } from 'react';
import styles from './Dashboard.module.css';
import { FiArrowRightCircle } from 'react-icons/fi'; 
import { FloatingButtons } from '../components/FloatingButtons';

const logoImg = "/logo-backBlack-horizontal.png"; 

const popularItems = [
  { id: 1, image: "/dashboard-I.png" }, 
  { id: 2, image: "/dashboard-II.png" }, 
  { id: 3, image: "/dashboard-III.png" }, 
  { id: 4, image: "/dashboard-I.png" }, 
  { id: 5, image: "/dashboard-II.png" }, 
];

const friendsItems = [
  { id: 6, image: "/dashboard-III.png" },
  { id: 7, image: "/dashboard-I.png" },
  { id: 8, image: "/dashboard-II.png" },
];

const DashboardPage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  const startDragging = (e: MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={styles.pageContainer}>
      
      <header className={styles.headerLogo}>
        <img src={logoImg} alt="Food Boxd Logo" className={styles.logoImage} />
      </header>

    
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Populares essa semana</h2>
          <FiArrowRightCircle className={styles.arrowIcon} />
        </div>

        <div 
          className={styles.horizontalScroll}
          ref={scrollRef1}
          onMouseDown={(e) => startDragging(e, scrollRef1)}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={(e) => onMouseMove(e, scrollRef1)}
        >
          {popularItems.map((item) => (
            <div key={item.id} className={styles.foodCard}>
              <img 
                src={item.image} 
                alt="Item" 
                className={styles.cardImage} 
                style={{ pointerEvents: 'none' }} 
              />
            </div>
          ))}
        </div>
      </section>

      
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Veja o que Seus Amigos estão Experimentando</h2>
          <FiArrowRightCircle className={styles.arrowIcon} />
        </div>

        <div 
          className={styles.horizontalScroll}
          ref={scrollRef2}
          onMouseDown={(e) => startDragging(e, scrollRef2)}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={(e) => onMouseMove(e, scrollRef2)}
        >
          {friendsItems.map((item) => (
            <div key={item.id} className={styles.foodCard}>
              <img 
                src={item.image} 
                alt="Item" 
                className={styles.cardImage} 
                style={{ pointerEvents: 'none' }} 
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* <FloatingButtons /> */}
    </div>
  );
};

export default DashboardPage;