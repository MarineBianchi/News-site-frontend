import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value);

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  // fetch de la route pour display les articles

  useEffect(() => {
    fetch('https://news-site-backend-six.vercel.app/articles')
      .then(response => response.json())
      .then(data => {

        // met à jour l'état topArticle avec le premier article  et l'état articlesData avec les articles restants
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

  // si hiddenArticles n'est pas trouvé dans articlesdata on le stock dans filteredArticles, si non ne passe pas le test n'est pas stocké

  const filteredArticles = articlesData.filter((data) => !hiddenArticles.includes(data.title));


  const articles = filteredArticles.map((data, i) => {

// Détermine si un article est mis en bookmark en vérifiant si son titre est présent dans le tableau bookmarks 

    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
    return <Article key={i} {...data} isBookmarked={isBookmarked} />;
  });


  const isBookmarked = bookmarks.some(bookmark => bookmark.title === topArticle.title);
  
    const topArticles = <TopArticle {...topArticle} isBookmarked={isBookmarked} />
  
  
  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;
