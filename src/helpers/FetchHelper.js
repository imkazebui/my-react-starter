import { flow } from 'lodash';
import { api_root } from '../constants';
import { refreshTokenAction, logoutAction } from '../modules/auth/action';

/**
 *  Wrapper for Fetch API (https://developer.mozilla.org/en/docs/Web/API/Fetch_API)
 *  The result data is inspired by Angular 1's $http service.
 *  Features:
 *    - Convert response data to json implicitly.
 *    - Setup default headers.
 *    - Interceptors - do something before or after every request.
 *    - Retry (GET only) on error.
 *    - Some utils method to convert request data.
 *  Future note: Consider using service worker instead of this for more standard solution.
 *  Usage sample:
 *    const [data, status] = await fetchHelperInstance.fetch( *the same parameters as Fetch API* )
 */
class FetchHelper {
	// CONFIGURATION
	static RETRY = true;
	static MAX_RETRY = 3;
	static RETRY_DELAY = 1000;
	// END OF CONFIGURATION

	FORM_URL_ENCODED = 'application/x-www-form-urlencoded';

	constructor() {
		this.defaultInit = {};
		this.defaultHeaders = {
			'Content-Type': 'application/json',
		};
		this.beforeRequestInterceptors = [];
		this.afterResponseInterceptors = [];

		this.fetch = this.fetch.bind(this);
		this.addDefaultHeader = this.addDefaultHeader.bind(this);
		this.removeDefaultHeader = this.removeDefaultHeader.bind(this);
		this.addBeforeRequestInterceptor = this.addBeforeRequestInterceptor.bind(this);
		this.addAfterResonseInterceptor = this.addAfterResonseInterceptor.bind(this);
		this.getHeader = this.getHeader.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.setReduxStore = this.setReduxStore.bind(this);
	}

	setReduxStore(store) {
		this.reduxStore = store;
	}

	/**
	 *  Add default header to each Fetch request.
	 */
	addDefaultHeader(key, value) {
		this.defaultHeaders[key] = value;
	}
	/**
	 *  Remove default header
	 */
	removeDefaultHeader(key) {
		delete this.defaultHeaders[key];
	}
	/**
	 *  To define something to do before every fetch request.
	 *  Params:
	 *      TBD
	 *  Result:
	 *      Returns a function to remove added interceptor.
	 *  Future note: Consider using Service Worker
	 */
	addBeforeRequestInterceptor(interceptor) {
		this.beforeRequestInterceptors.push(interceptor);
		return () => {
			const index = this.beforeRequestInterceptors.indexOf(interceptor);
			this.beforeRequestInterceptors.splice(index, 1);
		};
	}
	/**
	 *  To define something to do after every fetch response.
	 *  If one of interceptors returns false, the process will be stop immediately.
	 *  Params:
	 *      interceptor: function (response)
	 *  Result:
	 *      Returns a function to remove added interceptor.
	 *  Future note: Consider using Service Worker
	 */
	addAfterResonseInterceptor(interceptor) {
		this.afterResponseInterceptors.push(interceptor);
		return () => {
			const index = this.afterResponseInterceptors.indexOf(interceptor);
			this.afterResponseInterceptors.splice(index, 1);
		};
	}
	jsonToForm(json = {}) {
		return Object.keys(json)
			.map(key => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
			})
			.join('&');
	}
	jsonToQueryString(json = {}) {
		return Object.keys(json)
			.map(key => {
				const value = json[key];
				if (value && value.constructor === Array) {
					return value.map(valueItem => `${key}=${valueItem}`).join('&');
				} else if (value || value === 0) {
					return `${key}=${value}`;
				} else {
					return '';
				}
			})
			.filter(item => item)
			.join('&');
	}

	async fetch(input, init = {}) {
		let initWithDefaultHeaders = {
			...this.defaultInit,
			...init,
			headers: mergeWithDefaultHeaders(init.headers, this.defaultHeaders),
		};

		//run interceptors before each request
		let beforeRequestInterceptorsResult = applyBeforeRequestInterceptors(this.beforeRequestInterceptors);
		if (beforeRequestInterceptorsResult === false) {
			throw new Error('Fetch Promise was canceled by interceptor before requested');
		}
		let response;

		// run fetch() to request api...
		try {
			//...create difference kind of fetches to handle errors
			const customFetch = flow([this._fetchWith401Retry])(fetch);

			response = await customFetch(input, initWithDefaultHeaders);
		} catch (e) {
			console.warn('[FetchHelper]', e);
			applyAfterResponseInterceptors(e, this.afterResponseInterceptors);
			return [e, -1];
		}

		//handle response
		const responseStatus = response.status;
		let jsonData = null;
		try {
			jsonData = await response.json();

			// run interceptors after each requests
			let afterResponseInterceptorsResult = applyAfterResponseInterceptors(
				response,
				this.afterResponseInterceptors,
				jsonData
			);
			if (afterResponseInterceptorsResult === false) {
				throw new Error('Fetch Promise was canceled by interceptor after responded');
			}
			return [jsonData, responseStatus];
		} catch (e) {
			if (!jsonData) {
				let afterResponseInterceptorsResult = applyAfterResponseInterceptors(
					response,
					this.afterResponseInterceptors,
					jsonData,
					initWithDefaultHeaders
				);
				if (afterResponseInterceptorsResult === false) {
					throw new Error('Fetch Promise was canceled by interceptor after responded');
				}
			}
			console.warn(`Can not parse json from response of API "${input}" with code ${responseStatus}.`, e);
			return [response, responseStatus];
		}
	}
	uploadFile(url, opts = {}, onProgress) {
		return new Promise((res, rej) => {
			var xhr = new XMLHttpRequest();
			xhr.open(opts.method || 'post', url);
			const headers = mergeWithDefaultHeaders(opts.headers, this.defaultHeaders);
			for (var k in headers) xhr.setRequestHeader(k, headers[k]);
			xhr.onload = e => {
				try {
					const json = JSON.parse(e.target.responseText);
					res([json, xhr.status]);
				} catch (err) {
					res([e.target.responseText, xhr.status]);
				}
			};
			xhr.onerror = rej;
			if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
			xhr.send(opts.body);
		});
	}
	getHeader() {
		return this.defaultHeaders;
	}
	_fetchWith401Retry = fetch => async (input, init) => {
		const resp = await fetch(input, init);

		if (resp.status === 401) {
			console.warn('TODO - [FetchHelper#_fetchWith401Retry] get refesh_token to retry');
			let user = this.reduxStore.getState().auth;
			const respClone = resp.clone();
			const respData = await respClone.json();
			if (respData.code === 2005) {
				this.reduxStore.dispatch(logoutAction({}));
			}
			if (respData.code === 2006) {
				try {
					const { refresh_token } = user.tokens;
					const renewSessionResp = await fetch(`${api_root}/authorize/token`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							refresh_token,
						}),
					});
					if (renewSessionResp.status === 200) {
						const renewSessionJson = await renewSessionResp.json();
						const { access_token } = renewSessionJson;
						// console.log('renw', renewSessionJson);
						if (access_token) {
							const newAuthData = { user: user.user, tokens: renewSessionJson };
							localStorage.setItem('auth', JSON.stringify(newAuthData));
							this.reduxStore.dispatch(
								refreshTokenAction({ tokens: renewSessionJson, token: access_token })
							);
							// console.log('init', init);
							const newInit = { ...init, Authorization: `Bearer ${access_token}` };
							const secondResp = await fetch(input, newInit);
							return secondResp;
						} else {
							console.warn('[FetchHelper]', renewSessionJson);
						}
					}
				} catch (e) {
					console.warn('[FetchHelper] Renew session error:', e);
				}
			}
		}
		return resp;
	};
}

/*** PRIVATE METHODS: ***/

function mergeWithDefaultHeaders(headers = {}, defaultHeaders) {
	var headerObj = {};
	if (headers instanceof Headers) {
		headers.forEach(([key, value]) => {
			headerObj[key] = value;
		});
	} else {
		headerObj = headers;
	}

	return Object.assign({}, defaultHeaders, headerObj);
}

function applyBeforeRequestInterceptors(interceptors) {
	interceptors.forEach(interceptor => {
		try {
			const interceptorResult = interceptor();
			if (interceptorResult === false) {
				console.error(
					'Interceptor ',
					interceptor,
					' has cancel signal. This makes the request stop immediately.'
				);
				return false;
			}
		} catch (e) {
			console.error(`[FetchHelper] Error from interceptor ${interceptor}`, e);
			return false;
		}
	});
}

function applyAfterResponseInterceptors(response, interceptors, jsonData, initWithDefaultHeaders) {
	interceptors.forEach(interceptor => {
		try {
			const interceptorResult = interceptor(response, jsonData, initWithDefaultHeaders);
			if (interceptorResult === false) {
				console.error(
					'Interceptor ',
					interceptor,
					' has cancel signal. This makes the request stop immediately.'
				);
				return false;
			}
		} catch (e) {
			console.error(`[FetchHelper] Error from interceptor ${interceptor}`, e);
			return false;
		}
	});
}

const fetchHelperInstance = new FetchHelper();

export default fetchHelperInstance;
