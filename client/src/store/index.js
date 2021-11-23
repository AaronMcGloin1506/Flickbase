import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import appReducers from './reducers'

const ReduxStore = () => {
    const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        appReducers,
        composeEnhansers(applyMiddleware(thunk))
    );

    return store;
}

export default ReduxStore;