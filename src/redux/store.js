import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';
import FetchHelper from '../helpers/FetchHelper.js';
/**
 *  Redux Store configuration
 */

const middlewares = [thunk];

//create store
let store = createStore(
	reducers,
	{},
	compose(
		applyMiddleware(...middlewares),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
		process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

FetchHelper.setReduxStore(store);

export default store;
