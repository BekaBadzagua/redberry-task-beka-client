import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classes from './Language.module.css';

const Language = props => {
  const { i18n } = useTranslation();

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={classes.Language}>
      <button onClick={() => changeLanguage('en')}>ENG</button>
      <button onClick={() => changeLanguage('ge')}>GEO</button>
    </div>
  );
};

export default Language
