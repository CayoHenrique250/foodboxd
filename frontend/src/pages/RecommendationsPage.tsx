import React from 'react';
import styles from './RecommendationsPage.module.css';

const recommendationsData = [
  { 
    id: 1, 
    title: "Melhores Hamburgers de Salvador", 
    image: "/recommendations.png"  
  },
  { 
    id: 2, 
    title: "Ambiente Calmo e Comida Leve", 
    image: "/recommendations.png" 
  },
  { 
    id: 3, 
    title: "Cafés para Trabalhar Remoto", 
    image: "/recommendations.png" 
  },
  { 
    id: 4, 
    title: "Jantar Romântico na Orla", 
    image: "/recommendations.png" 
  },
  { 
    id: 5, 
    title: "Comida Vegana em Salvador", 
    image: "/recommendations.png" 
  },
  { 
    id: 6, 
    title: "Lanches Rápidos e Gostosos", 
    image: "/recommendations.png" 
  }
];
const RecommendationsPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      
      <header className={styles.headerLogo}>
        <img 
          src="/logo-backBlack-horizontal.png" 
          alt="Food Boxd Logo" 
          className={styles.logoImage} 
        />
      </header>
      
      <div className={styles.gridContainer}>
        {recommendationsData.map((card) => (
          <div key={card.id} className={styles.card}>
            {card.image && <img src={card.image} alt={card.title} className={styles.cardImage} />}
            <div className={styles.cardOverlay}>
              <span className={styles.cardTitle}>{card.title}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RecommendationsPage;