import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { logoutAction } from '../../auth/action';

class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { auth, component: Component, ...rest } = this.props;
		const refreshTokenValue = Cookies.get('refresh_token');
		if (!refreshTokenValue || !auth.token) {
			this.props.dispatch(logoutAction());
			return (
				<Route
					{...rest}
					render={props => (
						<Redirect
							to={{
								pathname: '/login',
							}}
						/>
					)}
				/>
			);
		}
		if (auth.token) {
			return <Route {...rest} render={props => <Component {...props} />} />;
		}
	}
}

export default connect(
	state => ({ auth: state.auth }),
	dispatch => ({ dispatch })
)(PrivateRoute);
