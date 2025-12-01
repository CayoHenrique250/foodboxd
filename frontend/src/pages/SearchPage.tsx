import React from 'react';
import styles from './SearchPage.module.css';

import { FiSearch, FiArrowRightCircle } from 'react-icons/fi'; 


const SearchPage: React.FC = () => {
  
  const searchOptions = [
    "Últimas Datas",
    "Tipo, País ou Região",
    "Restaurante",
    "Comida",
    "Mais Populares",
    "Mais Bem Avaliados",
    "Listas Mais Curtidas"
  ];

  return (
    <div className={styles.pageContainer}>
      
      <header className={styles.headerLogo}>
        <img 
          src="/logo-backBlack-horizontal.png" 
          alt="Logo" 
          className={styles.logoImage} 
        />
      </header>

      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Pesquisa" 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.optionsList}>
        <span className={styles.optionsHeader}>Pesquise por:</span>
        
        {searchOptions.map((option, index) => (
          <div key={index} className={styles.optionItem}>
            <span className={styles.optionText}>{option}</span>
            <FiArrowRightCircle className={styles.arrowIcon} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default SearchPage;