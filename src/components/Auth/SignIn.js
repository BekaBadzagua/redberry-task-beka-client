import React from 'react';
import { Button } from 'react-bootstrap';
import { InputIsValid } from '../../shared/InputTools';
import Errorbox from '../UI/Errorbox/Errorbox';
import { connect } from 'react-redux';
import * as actions from '../../store/index';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errMessages: [],
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }
  submitHandler(event) {
    event.preventDefault();
    // Validate
    const msgs = validateSignIn(this.state.email, this.state.password);
    if (msgs.length > 0) this.setState({ ...this.state, errMessages: msgs });
    else {
      // Clear Error if Any
      if (this.state.errMessages.length > 0)
        this.setState({ ...this.state, errMessages: [] });

      // Redux
      this.props.onSignIn(this.state.email, this.state.password, () => {
        this.props.history.push('/');
      });
    }
  }

  render() {
    return (
      <div className="authWrapper">
        <Errorbox messages={this.state.errMessages} />
        {this.props.error ? <Errorbox text={this.props.error} /> : null}

        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
          </div>
          <div className="centered-aligned">
            <Button
              onClick={this.submitHandler}
              type="submit"
              className="btn btn-success"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Pure Function for validating input
function validateSignIn(email, password) {
  const msgs = [];
  if (!InputIsValid(email, { required: true, isEmail: true }))
    msgs.push('Email is in wrong Format!');
  if (!InputIsValid(password, { required: true, minLength: 4, maxLength: 15 }))
    msgs.push('Password is in wrong Format!');
  return msgs;
}

// Connecting with Redux
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId !== null,
    error: state.auth.error,
    loading: state.auth.loading !== null,
  };
};
const maiDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password, changeRoute) =>
      dispatch(actions.signIn(email, password, changeRoute)),
  };
};

export default connect(mapStateToProps, maiDispatchToProps)(SignIn);
