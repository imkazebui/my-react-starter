import FetchHelper from '../../../helpers/FetchHelper.js';
import { api_root, key_upload_img, api_img_root } from '../../../constants';

export const FETCHING = 'FETCHING';
export const FETCHING_FINISH = 'FETCHING_FINISH';

export const NEW_NOTIFY = 'NEW_NOTIFY';

export const fetchingAction = () => ({ type: FETCHING });
export const fetchingFinishAction = () => ({ type: FETCHING_FINISH });

export const newNotifyAction = data => ({ type: NEW_NOTIFY, data });

const GET_LIST_BRANCHES_SUCCESS = 'GET_LIST_BRANCHES_SUCCESS';

export const getListBranchesAction = token => dispatch => {
	dispatch(fetchingAction());
	return FetchHelper.fetch(`${api_root}/branches`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then(([data, status]) => {
		dispatch(fetchingFinishAction());

		if (status === 200) {
			dispatch({
				type: GET_LIST_BRANCHES_SUCCESS,
				data,
			});
			return [false, data];
		} else {
			dispatch(newNotifyAction({ data, type: 'error' }));
			return [true, data];
		}
	});
};

export const uploadImgAction = (file, token) => dispatch => {
	dispatch(fetchingAction());
	let data = new FormData();
	data.append('file', file);
	return fetch(`${api_img_root}/images?key=${key_upload_img}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: data,
	})
		.then(res => res.json())
		.then(res => {
			console.log('res', res);
			dispatch(fetchingFinishAction());

			if (res.id) {
				console.log('success');
				return [true, res];
			} else {
				console.log('fail');
				dispatch(newNotifyAction({ data, type: 'error' }));
				return [false, res];
			}
		});
};

const GET_LIST_PRODUCT_SUCCESS = 'GET_LIST_PRODUCT_SUCCESS';
export const getListProductAction = token => dispatch => {
	dispatch(fetchingAction());
	return FetchHelper.fetch(`${api_root}/products`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then(([data, status]) => {
		dispatch(fetchingFinishAction());

		if (status === 200) {
			let obj = {};
			data.map(item => (obj[item.type] = item));
			dispatch({ type: GET_LIST_PRODUCT_SUCCESS, data: obj });
			return [false, obj];
		} else {
			dispatch(newNotifyAction({ data, type: 'error' }));
			return [true, data];
		}
	});
};

// App reducer
const initialState = {
	isFetching: false,
	notify: null,
	success: null,
	listBranches: [],
	listProduct: {},
};

export default function app(state = initialState, { type, data }) {
	switch (type) {
		case FETCHING:
			return { ...state, isFetching: true };
		case FETCHING_FINISH:
			return { ...state, isFetching: false };
		case NEW_NOTIFY:
			return { ...state, notify: { ...data } };
		case GET_LIST_BRANCHES_SUCCESS:
			return { ...state, listBranches: data };
		case GET_LIST_PRODUCT_SUCCESS:
			return { ...state, listProduct: data };
		default:
			return state;
	}
}
