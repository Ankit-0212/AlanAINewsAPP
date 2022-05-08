import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/logo.jpg';
import { NewsCards, Modal } from './components';
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: 'dc7c23ab38360722022e4b970f36127d2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="data:image/jpeg;base64,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" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/ankit-raj-srivastava-1a93241a0/">Ankit Raj Srivastava</a> 
          </Typography>
          <img className={classes.image} src={logo} height="50px" alt="JSMastery logo" />
        </div>
      ) : null}
    </div>
  );
};

export default App;
