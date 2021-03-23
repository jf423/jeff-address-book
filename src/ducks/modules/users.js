import { createAction } from 'redux-actions';

import { DEFAULT_NATIONALITIES } from '../../config/user.js';

export const initialState = {
    userData: [],
    nationalities: DEFAULT_NATIONALITIES,
    searchText: ''
};

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_NATIONALITIES = 'UPDATE_NATIONALITIES';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

export const updateUserDataAction = createAction(UPDATE_USER_DATA);
export const updateNationalitiesAction = createAction(UPDATE_NATIONALITIES);
export const setSearchTextAction = createAction(SET_SEARCH_TEXT);

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_USER_DATA: {
        const newState = {
            ...state,
            userData: action.payload
        };
        return newState;
    }
    case UPDATE_NATIONALITIES: {
        const newState = {
            ...state,
            nationalities: action.payload
        };
        return newState;
    }
    case SET_SEARCH_TEXT: {
        const newState = {
            ...state,
            searchText: action.payload
        };
        return newState;
    }
    default: {
        return { ...state };
    }
    }
};

export default reducer;
