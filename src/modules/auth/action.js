import FetchHelper from '../../helpers/FetchHelper.js';
import { api_root } from '../../constants';

import * as appAction from '../common/App';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginAction = param => dispatch => {
	dispatch(appAction.fetchingAction());
	FetchHelper.fetch(`${api_root}/authorize?client=admin_portal`, {
		method: 'POST',
		body: JSON.stringify(param),
	}).then(([data, status]) => {
		if (status === 200) {
			dispatch({ type: LOGIN_SUCCESS, data });
			window.location.href = '?#/dashboard';
		} else {
			dispatch(appAction.newNotifyAction({ data, type: 'error' }));
		}
		dispatch(appAction.fetchingFinishAction());
	});
};

export const LOGOUT = 'LOGOUT';
export const logoutAction = () => ({ type: LOGOUT });

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const refreshTokenAction = data => ({ type: REFRESH_TOKEN, data });
