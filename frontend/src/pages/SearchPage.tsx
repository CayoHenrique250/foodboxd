import React from 'react';
import styles from './SearchPage.module.css';
import logoImg from '../assets/logo.png';

import { FiSearch, FiArrowRightCircle } from 'react-icons/fi'; 


const SearchPage: React.FC = () => {
  
  // Lista de opções conforme a imagem
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
      
      
      {/* 2. AQUI ESTÁ A TROCA DO TEXTO PELA IMAGEM */}
      <header className={styles.headerLogo}>
        <span className={styles.logoText}>Food</span>
        <img 
          src={logoImg} 
          alt="Logo" 
          className={styles.logoImage} 
        />
        <span className={styles.logoText}>Boxd</span>
      </header>

      {/* Barra de Pesquisa */}
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Pesquisa" 
          className={styles.searchInput}
        />
      </div>

      {/* Lista de Filtros */}
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