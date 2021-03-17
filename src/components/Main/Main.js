import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as actions from '../../store/index';
import MessageBox from './MessageBox/MessageBox';
import WeightTable from './Tables/Weight';
import AddModal from './AddModal/AddModal';
import Chart from './Chart/Chart';
import cls from './Main.module.css';

function Main(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageBox, setMessageBox] = useState({
    message: '',
    gained: false,
  });
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token || props.isAuthenticated) setLoggedIn(true);
    if (props.userId !== props.weightUserId || props.weightUserId == null)
      props.getWeights(localStorage.getItem('userId'));
  }, [props.isAuthenticated]);

  if (!loggedIn) {
    return (
      <div className={cls.LogInMessage}>
        <h1>{t('please log in')}</h1>
      </div>
    );
  }

  return (
    <div>
      <MessageBox messageBox={messageBox} setMessageBox={setMessageBox} />
      <div className={cls.ButtonWrapper}>
        <button onClick={() => setShowModal(true)}>{t('add')}</button>
      </div>

      <AddModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        updateMessage={setMessageBox}
      />
      <WeightTable data={props.datalist} />
      <Chart datalist={props.datalist} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token,
    userId: state.auth.userId,
    datalist: state.weight.list,
    weightUserId: state.weight.userId,
  };
};
const maiDispatchToProps = dispatch => {
  return {
    getWeights: id => dispatch(actions.getWeights(id)),
  };
};

export default connect(mapStateToProps, maiDispatchToProps)(Main);
