import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/index';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageBox from '../../UI/Language/Language';
import UserIcon from '@material-ui/icons/Person';
import Logo from '../../../assets/images/logo.png';
import cls from '../Layout.module.css';

function Topbar(props) {
  const [showUser, setShowUser] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token || props.isAuthenticated) setShowUser(true);
  }, [props.isAuthenticated]);

  const logOutHandler = () => {
    props.onLogOut();
    setShowUser(false);
    history.push('signin');
  };

  return (
    <header className={cls.TopBar}>
      <div className="basicWrapper">
        <div className={cls.logoWrapper}>
          <img src={Logo} alt="logo" />
        </div>

        <div className={cls.NavigationWrapper}>
          <ul className={cls.TopList}>
            <li className="dropdown">
              <LanguageBox />
            </li>
          </ul>
          <ul>
            <NavLink to="/" exact={true} activeClassName={cls.ActiveItem}>
              <li>{t('home')}</li>
            </NavLink>
            {showUser ? (
              <li className={cls.Exit} onClick={logOutHandler}>
                {t('exit')}
                <UserIcon />
              </li>
            ) : (
              <React.Fragment>
                <NavLink
                  to="/signin"
                  exact={true}
                  activeClassName={cls.ActiveItem}
                >
                  <li>{t('sign in')}</li>
                </NavLink>
                <NavLink
                  to="/signup"
                  exact={true}
                  activeClassName={cls.ActiveItem}
                >
                  <li>{t('sign up')}</li>
                </NavLink>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token,
  };
};
const maiDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actions.logOut()),
  };
};

export default connect(mapStateToProps, maiDispatchToProps)(Topbar);
