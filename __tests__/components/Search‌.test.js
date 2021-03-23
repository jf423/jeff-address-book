import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toHaveValue } from '@testing-library/jest-dom/matchers';

import { initStore } from '../../src/ducks/store.js';
import { setSearchTextAction } from '../../src/ducks/modules/users.js';

import { INDEX_PAGE } from '../../src/config/selectors.json';

import Search from '../../src/components/Search‌.js';

expect.extend({ toBeInTheDocument, toHaveValue });

const mockDispatch = jest.fn();
const {
    SEARCH_CONTAINER,
    SEARCH_INPUT,
    SEARCH_CLEAR,
    SEARCH_BUTTON
} = INDEX_PAGE;

describe('Search component test', () => {
    let search;
    const store = initStore();
    store.dispatch = mockDispatch;
    const renderSearch = props => (
        <Provider store={store}>
            <Search {...props} />
        </Provider>
    );

    beforeEach(() => {
        search = render(renderSearch());
    });

    afterEach(() => {
        search.unmount();
    });

    test('should display as expected', () => {
        const searchContainer = search.getByTestId(SEARCH_CONTAINER.ID);
        const searchInput = search.getByTestId(SEARCH_INPUT.ID);
        const clearButton = search.getByTestId(SEARCH_CLEAR.ID);
        const searchButton = search.getByTestId(SEARCH_BUTTON.ID);

        expect(searchContainer).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(clearButton).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
        expect(search).toMatchSnapshot();
    });

    test('should be trigger correctly when the user input the search text', () => {
        const searchInput = search.getByTestId(SEARCH_INPUT.ID).querySelector('input');

        fireEvent.change(searchInput, { target: { value: 'test' } });
        expect(searchInput).toHaveValue('test');
    });

    test('should be trigger correctly when the user clicks the clear button', () => {
        const searchInput = search.getByTestId(SEARCH_INPUT.ID).querySelector('input');
        const clearButton = search.getByTestId(SEARCH_CLEAR.ID);

        fireEvent.click(clearButton);
        expect(searchInput).toHaveValue('');
    });

    test('should be trigger correctly when the user clicks the search button', () => {
        const searchInput = search.getByTestId(SEARCH_INPUT.ID).querySelector('input');
        fireEvent.change(searchInput, { target: { value: 'hello' } });
        const searchButton = search.getByTestId(SEARCH_BUTTON.ID);
        fireEvent.click(searchButton);
        expect(mockDispatch).toHaveBeenCalledWith(setSearchTextAction('hello'));
    });
});
