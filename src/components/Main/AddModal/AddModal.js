import React, { useState, useRef } from 'react';
import Modal from '../../UI/Modals/MediumModal/MediumModal';
import { connect } from 'react-redux';
import * as actions from '../../../store/index';
import { useTranslation } from 'react-i18next';
import { Transition } from 'react-transition-group';
import cls from '../Main.module.css';


function AddModal(props) {
  const { t } = useTranslation();
  const [showError, setShowError] = useState(false);
  const inputRef = useRef();
  const submitHandler = e => {
    e.preventDefault();
    //validation
    let value = parseFloat(inputRef.current.value);
    if (!value || value < 0) setShowError(true);
    else {
      if (showError) {
        setShowError(false);
      }
      value = value.toFixed(3);

      // Send Request
      props.onSubmit(value, localStorage.getItem('userId'));
      props.onClose();

      // Show Messaage
      // თუ ახალი დამატებული წონა მეტია ბოლოს დამატებულ წონაზე
      const { list } = props;
      if (list && list.length > 0) {
        const lastWeight = list[list.length - 1].value;
        if (parseFloat(lastWeight) > parseFloat(value)) {
          const difference = (lastWeight - value).toFixed(3);
          props.updateMessage({
            message: t('you lost') + ' ' + difference + ' ' + t('kilograms'),
            gain: false,
          });
        } else {
          const difference = (value - lastWeight).toFixed(3);
          props.updateMessage({
            message:
              t('you gained') + ' ' + +difference + ' ' + t('kilograms'),
            gain: true,
          });
        }
      }
    }
  };

  return (
    // Transition საიამოვნო ანიმაციისათვის და კიდევ იმისათვის რომ როდესაც არ გვჭირდება
    // მოდალი ის ამოღებულ იქნეს DOM იდან
    <Transition in={props.showModal} timeout={400} mountOnEnter unmountOnExit>
      {state => {
        let modalClasses = ['modal-black'];
        switch (state) {
          case 'entering':
            modalClasses.push('FadeIn');
            break;
          case 'exiting':
            modalClasses.push('FadeOut');
            break;
          default:
            break;
        }
        return (
          <div className={modalClasses.join(' ')}>
            <Modal save={submitHandler} onClose={props.onClose}>
              {showError ? (
                <p className={cls.FormError}>{t('data is in a wrong format')}</p>
              ) : null}
              <form className="centered-aligned">
                <label>{t('weight kg')}</label>
                <input
                  type="text"
                  placeholder="0"
                  name="weight"
                  ref={inputRef}
                />
              </form>
            </Modal>
          </div>
        );
      }}
    </Transition>
  );
}

const mapStateToProps = state => {
  return {
    list: state.weight.list,
  };
};
const maiDispatchToProps = dispatch => {
  return {
    onSubmit: (value, userID) =>
      dispatch(actions.addtWeight({ value, userID })),
  };
};

export default connect(mapStateToProps, maiDispatchToProps)(AddModal);
