import reducer, {
    initialState,
    UPDATE_USER_DATA,
    UPDATE_NATIONALITIES,
    SET_SEARCH_TEXT
} from '@/ducks/modules/users.js';

describe('users redux test', () => {
    describe('state test', () => {
        test('should return the initial state correctly', () => {
            expect(reducer(undefined, {})).toEqual(initialState);
        });
    });

    describe('reducer action test', () => {
        test('reducer should update the userData correctly', () => {
            const newState = reducer(initialState, {
                type: UPDATE_USER_DATA,
                payload: []
            });
            expect(newState).toEqual({ ...initialState, userData: [] });
        });

        test('reducer should update the nationalities correctly', () => {
            const newState = reducer(initialState, {
                type: UPDATE_NATIONALITIES,
                payload: ['ch']
            });
            expect(newState).toEqual({ ...initialState, nationalities: ['ch'] });
        });

        test('reducer should set the searchText correctly', () => {
            const newState = reducer(initialState, {
                type: SET_SEARCH_TEXT,
                payload: ''
            });
            expect(newState).toEqual({ ...initialState, searchText: '' });
        });
    });
});
