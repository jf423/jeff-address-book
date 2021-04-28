import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { toBeInTheDocument, toHaveTextContent, toHaveValue } from '@testing-library/jest-dom/matchers';

import { initStore } from '@/ducks/store.js';

import { INDEX_PAGE } from '@/config/selectors.json';
import { DEFAULT_NATIONALITIES } from '@/config/user.js';

import Users from '@/components/Users.js';

import DATA from '../mockUsersData.json';

expect.extend({ toBeInTheDocument, toHaveTextContent, toHaveValue });

const initialState = {
    userData: DATA.results,
    nationalities: DEFAULT_NATIONALITIES,
    searchText: ''
};
const mockDispatch = jest.fn();
const {
    USER_CONTAINER,
    USER_CONTENT
} = INDEX_PAGE;

describe('User component test', () => {
    let user;
    const store = initStore(initialState);
    store.dispatch = mockDispatch;
    const renderUser = props => (
        <Provider store={store}>
            <Users {...props} />
        </Provider>
    );

    beforeEach(() => {
        user = render(renderUser());
    });

    afterEach(() => {
        user.unmount();
    });

    test('should display as expected', () => {
        const userContainer = user.getByTestId(USER_CONTAINER.ID);
        const userContent = user.getByTestId(USER_CONTENT.ID);

        expect(userContainer).toBeInTheDocument();
        expect(userContent).toBeInTheDocument();
        expect(user).toMatchSnapshot();
    });
});
