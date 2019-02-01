import React from 'react';

export default ({articles}) => {

  return (
    <div className='news-container'>
      <h1 className='grey-border-bottom'>News</h1>
      {articles.map(article => (
        <a key={article.url} href={article.url} className='news-link' target='_blank'>
          {/* <img src={article.image} alt=""/> */}
          <h4>{article.source}</h4>
          <h3>{article.headline}</h3>
          <p>{article.summary}</p>
        </a>
      ))}
    </div>
  );
};