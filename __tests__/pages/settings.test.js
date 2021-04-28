import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

import { initStore } from '@/ducks/store.js';

import { SETTINGS_PAGE } from '@/config/selectors.json';

import Settings from '../../pages/settings.js';

const mockDispatch = jest.fn();

expect.extend({ toBeInTheDocument });

describe('Settings component test', () => {
    let settings;
    const store = initStore();
    store.dispatch = mockDispatch;
    const renderSettings = props => (
        <Provider store={store}>
            <Settings {...props} />
        </Provider>
    );

    beforeEach(() => {
        settings = render(renderSettings());
    });

    afterEach(() => {
        settings.unmount();
    });

    test('should display as expected', () => {
        const settingsContainer = settings.getByTestId(SETTINGS_PAGE.SETTINGS_CONTAINER.ID);

        expect(settingsContainer).toBeInTheDocument();
        expect(settings).toMatchSnapshot();
    });
});
