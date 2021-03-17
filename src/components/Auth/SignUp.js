import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ErrorBox from '../UI/Errorbox/Errorbox';
import { InputIsValid, InputChangeHandler } from '../../shared/InputTools';
import { connect } from 'react-redux';
import * as actions from '../../store/index';
import { useTranslation } from 'react-i18next';
import DemoIcon from '@material-ui/icons/HomeOutlined';

// Component
function SignUp(props) {
  const [inputData, setInputData] = useState({
    from_name: {
      elementConfig: {
        name: 'from_name',
        type: 'text',
        placeholder: 'First name',
      },
      elementType: 'input',
      icon: <DemoIcon />,
      invalid: false,
      value: '',
      rules: { required: true, maxLength: 50 },
    },
    from_surname: {
      elementConfig: {
        name: 'from_surname',
        type: 'text',
        placeholder: 'Last Name',
      },
      elementType: 'input',
      icon: <DemoIcon />,
      invalid: false,
      value: '',
      rules: { required: true, maxLength: 50 },
    },
    from_email: {
      elementConfig: {
        name: 'from_email',
        type: 'email',
        placeholder: 'Email address',
      },
      elementType: 'input',
      icon: <DemoIcon />,
      invalid: false,
      value: '',
      rules: { required: true, isEmail: true },
    },
    form_password: {
      elementConfig: {
        name: 'form_password',
        type: 'password',
        placeholder: 'Create password',
      },
      elementType: 'input',
      icon: <DemoIcon />,
      invalid: false,
      value: '',
      rules: { required: true, minLength: 4, maxLength: 15 },
    },
    confirm_password: {
      elementConfig: {
        name: 'confirm_password',
        type: 'password',
        placeholder: 'Repeat password',
      },
      elementType: 'input',
      icon: <DemoIcon />,
      invalid: false,
      value: '',
      rules: { required: true, minLength: 4, maxLength: 15 },
    },
  });
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  const { t } = useTranslation();

  const changeHandler = event => {
    // ვინაიდან changeHandler ხშირად არის საჭირო, ერთიდაიმავეს თავიდან წერის ასარიეებლად
    // გარკვეული ლოგიკა pure function ების სახით გატანილია InputTools-ში
    InputChangeHandler(event, inputData, setInputData);
  };

  const submitHandler = () => {
    let msgs = validateSignUpForm(inputData);
    if (msgs.length > 0) setMessages(msgs);
    else {
      if (messages.length !== 0) setMessages(msgs);
      const data = getValues_signUpForm(inputData);

      props.onSignUp(data, () => {
        history.push('/signin');
      });
    }
  };

  const inputs = Object.keys(inputData).map(key => {
    return (
      <div className="form-group input-group" key={key}>
        <span className="input-group-text">{inputData[key].icon}</span>
        <input
          className="form-control"
          {...inputData[key].elementConfig}
          onChange={changeHandler}
        />
      </div>
    );
  });

  return (
    <div className="authWrapper">
      <ErrorBox messages={messages} />
      {props.error ? <ErrorBox text={props.error} /> : null}
      <form>
        {inputs}
        <div className="form-group centered-aligned">
          <Button
            onClick={submitHandler}
            type="button"
            className="btn btn-success"
          >
            {t('create account')}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Connecting with Redux
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};
const maiDispatchToProps = dispatch => {
  return {
    onSignUp: (data, changeRoute) =>
      dispatch(actions.signUp(data, changeRoute)),
  };
};

export default connect(mapStateToProps, maiDispatchToProps)(SignUp);

// Pure Functions
function validateSignUpForm(inputData) {
  const messages = [];
  if (!InputIsValid(inputData.from_name.value, inputData.from_name.rules))
    messages.push('Username is not Valid!');
  if (!InputIsValid(inputData.from_email.value, inputData.from_email.rules))
    messages.push('Email is not Valid!');
  if (
    !InputIsValid(inputData.form_password.value, inputData.form_password.rules)
  )
    messages.push('password is not Valid!');
  if (
    !InputIsValid(
      inputData.confirm_password.value,
      inputData.confirm_password.rules
    )
  )
    messages.push('Confirm password is in wrong Format!');

  if (inputData.form_password.value !== inputData.confirm_password.value)
    messages.push('Passwords do not Match!');

  return messages;
}

function getValues_signUpForm(inputData) {
  return {
    name: inputData.from_name.value,
    surname: inputData.from_surname.value,
    email: inputData.from_email.value,
    password: inputData.form_password.value,
  };
}
