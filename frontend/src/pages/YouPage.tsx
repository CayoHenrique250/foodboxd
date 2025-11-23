import React from 'react';
import styles from './YouPage.module.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FloatingButtons } from '../components/FloatingButtons';

const logoImg = "/logo-backBlack-horizontal.png";

const activities = [
  {
    id: 1,
    user: "maria",
    avatar: "https://i.pravatar.cc/150?u=maria",
    type: "liked_your_review",
    rating: 4,
    restaurant: "Restaurante Bella Vista",
    time: "2h"
  },
  {
    id: 2,
    user: "carlos",
    avatar: "https://i.pravatar.cc/150?u=carlos",
    type: "commented_your_review",
    restaurant: "Café Central",
    comment: "Ótima recomendação!",
    time: "5h"
  },
  {
    id: 3,
    user: "ana",
    avatar: "https://i.pravatar.cc/150?u=ana",
    type: "liked_your_photo",
    restaurant: "Trattoria Italiana",
    time: "1d"
  },
  {
    id: 4,
    user: "pedro",
    avatar: "https://i.pravatar.cc/150?u=pedro",
    type: "started_following",
    time: "1d"
  },
  {
    id: 5,
    user: "lucia",
    avatar: "https://i.pravatar.cc/150?u=lucia",
    type: "liked_your_review",
    rating: 5,
    restaurant: "Burger King",
    time: "2d"
  },
  {
    id: 6,
    user: "rafael",
    avatar: "https://i.pravatar.cc/150?u=rafael",
    type: "visited_same_restaurant",
    restaurant: "El Mariachi",
    time: "3d"
  },
  {
    id: 7,
    user: "julia",
    avatar: "https://i.pravatar.cc/150?u=julia",
    type: "commented_your_review",
    restaurant: "Sushi House",
    comment: "Também quero experimentar!",
    time: "4d"
  },
  {
    id: 8,
    user: "gabriel",
    avatar: "https://i.pravatar.cc/150?u=gabriel",
    type: "liked_your_photo",
    restaurant: "Pizzaria Napoli",
    time: "5d"
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <span className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        i < rating ? <FaStar key={i} size={10} /> : <FaRegStar key={i} size={10} />
      ))}
    </span>
  );
};

const YouPage: React.FC = () => {

  return (
    <div className={styles.pageContainer}>
      
      <header className={styles.headerLogo}>
        <img src={logoImg} alt="Food Boxd" className={styles.logoImage} />
      </header>
      
      <div className={styles.activityList}>
        {activities.map((item) => (
          <div key={item.id} className={styles.activityItem}>
            
            <img src={item.avatar} alt={item.user} className={styles.avatar} />
            
            <div className={styles.contentContainer}>
              
              {item.type === 'liked_your_review' && (
                <span>
                  <span className={styles.username}>{item.user}</span> curtiu sua avaliação 
                  <StarRating rating={item.rating || 0} /> 
                  de <span className={styles.restaurantName}>{item.restaurant}</span>
                </span>
              )}

              {item.type === 'commented_your_review' && (
                <span>
                  <span className={styles.username}>{item.user}</span> comentou na sua avaliação de 
                  <span className={styles.restaurantName}> {item.restaurant}</span>
                  {item.comment && (
                    <>
                      <br/>
                      <span className={styles.comment}>"{item.comment}"</span>
                    </>
                  )}
                </span>
              )}

              {item.type === 'liked_your_photo' && (
                <span>
                  <span className={styles.username}>{item.user}</span> curtiu sua foto de 
                  <span className={styles.restaurantName}> {item.restaurant}</span>
                </span>
              )}

              {item.type === 'started_following' && (
                <span>
                  <span className={styles.username}>{item.user}</span> começou a seguir você
                </span>
              )}

              {item.type === 'visited_same_restaurant' && (
                <span>
                  <span className={styles.username}>{item.user}</span> visitou o mesmo restaurante que você: 
                  <span className={styles.restaurantName}> {item.restaurant}</span>
                </span>
              )}

            </div>

            <span className={styles.time}>{item.time}</span>
          </div>
        ))}
      </div>

      <FloatingButtons />
    </div>
  );
};

export default YouPage;
