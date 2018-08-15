import Cookies from 'js-cookie';

import { LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN } from './action';

let user = localStorage.getItem('auth');
user = user ? JSON.parse(user) : false;
if (user) {
	user.token = user.tokens.access_token;
}

const initialState = user && user.token ? user : {};

export default function auth(state = initialState, { type, data }) {
	switch (type) {
		case LOGIN_SUCCESS:
			Cookies.set('refresh_token', data.tokens.refresh_token, { expires: 29 });
			localStorage.setItem('auth', JSON.stringify(data));
			return { ...data, token: data.tokens.access_token };
		case LOGOUT:
			localStorage.removeItem('auth');
			Cookies.remove('refresh_token');
			return {};
		case REFRESH_TOKEN:
			Cookies.set('refresh_token', data.tokens.refresh_token, { expires: 29 });
			return { ...state, ...data };
		default:
			return state;
	}
}
