import styles from './FriendsPage.module.css'; 
import { FaStar, FaRegStar } from 'react-icons/fa';

const logoImg = "/logo-backBlack-horizontal.png"; 

const activities = [
  {
    id: 1,
    user: "ana",
    avatar: "https://i.pravatar.cc/150?u=ana", 
    type: "liked_review",
    targetUser: "helo",
    rating: 3,
    restaurant: "Restaurante Paris 6",
    time: "3d"
  },
  {
    id: 2,
    user: "ana",
    avatar: "https://i.pravatar.cc/150?u=ana",
    type: "visited",
    restaurant: "Restaurante Paris",
    details: "avaliou e adicionou uma foto",
    rating: 3,
    time: "3d",
    dateContext: "quinta-feira, dia 30 de Agosto"
  },
  {
    id: 3,
    user: "helo",
    avatar: "https://i.pravatar.cc/150?u=helo",
    type: "experimented",
    food: "Sorvete de Sonho",
    restaurant: "Seu Pedro Lanches",
    rating: 5,
    time: "3d"
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

const AmigosPage: React.FC = () => {


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
              
              {item.type === 'liked_review' && (
                <span>
                  <span className={styles.username}>{item.user}</span> curtiu a avaliação de 
                  <span className={styles.username}> {item.targetUser}</span> 
                  <StarRating rating={item.rating || 0} /> 
                  de <span className={styles.restaurantName}>{item.restaurant}</span>
                </span>
              )}

              {item.type === 'visited' && (
                <span>
                  <span className={styles.username}>{item.user}</span> visitou o restaurante 
                  <span className={styles.restaurantName}> {item.restaurant}</span>, 
                  {item.details} 
                  <br/> 
                  <StarRating rating={item.rating || 0} /> 
                  <span style={{ opacity: 0.7, fontSize: '0.8em' }}> {item.dateContext}</span>
                </span>
              )}

              {item.type === 'experimented' && (
                <span>
                  <span className={styles.username}>{item.user}</span> experimentou: 
                  {item.food} em <span className={styles.restaurantName}>"{item.restaurant}"</span> e avaliou
                  <StarRating rating={item.rating || 0} />
                </span>
              )}

            </div>

            <span className={styles.time}>{item.time}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AmigosPage;