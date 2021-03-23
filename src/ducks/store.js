import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer, { initialState } from './modules/users';

let store;

export function initStore(preloadedState = initialState) {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
    );
}

export function initializeStore(preloadedState) {
    const _store = store || initStore(preloadedState);
    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;

    return _store;
}

export function useStore(state) {
    return useMemo(() => initializeStore(state), [state]);
}
