import React from 'react';

export default ({articles}) => {

  return (
    <div className='news-container'>
      <h1 className='grey-border-bottom'>News</h1>
      {articles.map((article, i) => (
        <div className="news-link" key={i}>
          <a href={article.url} target='_blank'>
            <div className="news-image">
              <img src={article.urlToImage} alt=""/>
            </div>
            <div>
              <h4>{article.source.name}</h4>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};