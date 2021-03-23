import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

import { initStore } from '../../src/ducks/store.js';

import { INDEX_PAGE } from '../../src/config/selectors.json';

import App from '../../pages/index.js';

const mockDispatch = jest.fn();

expect.extend({ toBeInTheDocument });

describe('App component test', () => {
    let app;
    const store = initStore();
    store.dispatch = mockDispatch;
    const renderApp = props => (
        <Provider store={store}>
            <App {...props} />
        </Provider>
    );

    beforeEach(() => {
        app = render(renderApp());
    });

    afterEach(() => {
        app.unmount();
    });

    test('should display as expected', () => {
        const appContainer = app.getByTestId(INDEX_PAGE.INDEX_CONTAINER.ID);

        expect(appContainer).toBeInTheDocument();
        expect(app).toMatchSnapshot();
    });
});
