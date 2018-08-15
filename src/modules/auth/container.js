import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginAction } from './action';

import LoginPresenter from './presenter';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { auth: { username: '', password: '' } };
	}

	onLogin = e => {
		e.preventDefault();
		this.props.loginAction(this.state.auth);
	};

	onChangeInput = ({ target }) => {
		const { auth } = this.state;
		auth[target.name] = target.value;
		this.setState({ auth });
	};

	render() {
		return <LoginPresenter onLogin={this.onLogin} auth={this.state.auth} onChangeInput={this.onChangeInput} />;
	}
}

export default connect(null, dispatch => ({
	loginAction: param => dispatch(loginAction(param)),
}))(Login);
