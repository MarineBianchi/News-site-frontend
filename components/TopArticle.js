import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/TopArticle.module.css';

function TopArticle(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleBookmarkClick = () => {


      // On vérifie que l'utilisateur est bien connecté grace au token, si ce n'est pas le cas il ne peut pas ajouter un bookmark

    if (!user.token) {
      return;
    }

    // on fetch la route permettant à l’utilisateur d'ajouter ou supprimer un bookmark et on met à jour le reducer grace aux props

    fetch(`https://news-site-backend-pi.vercel.app/users/canBookmark/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  }

  // colorisation de l'icone
  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { 'color': '#E9BE59' };
  }

  return (
    <div className={styles.topContainer}>
      <img src={props.urlToImage} className={styles.image} alt={props.title} />
      <div className={styles.topText}>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <FontAwesomeIcon onClick={() => handleBookmarkClick()} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
        <h4>{props.author}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default TopArticle;
