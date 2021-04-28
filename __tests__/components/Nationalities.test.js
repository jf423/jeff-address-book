import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toBeChecked } from '@testing-library/jest-dom/matchers';

import { initStore } from '@/ducks/store.js';
import { updateNationalitiesAction } from '@/ducks/modules/users.js';

import { SETTINGS_PAGE } from '@/config/selectors.json';

import Nationalities from '@/components/Nationalities.js';

expect.extend({ toBeInTheDocument, toBeChecked });

const mockDispatch = jest.fn();
const {
    NATIONALITIES_CONTAINER,
    NATIONALITIES_BACK_BUTTON,
    NATIONALITIES_CHECKBOX_CH,
    NATIONALITIES_CHECKBOX_ES,
    NATIONALITIES_CHECKBOX_FR,
    NATIONALITIES_CHECKBOX_GB,
    NATIONALITIES_SAVE_BUTTON
} = SETTINGS_PAGE;

describe('Nationalities component test', () => {
    let nationalities;
    const store = initStore();
    store.dispatch = mockDispatch;
    const renderNationalities = props => (
        <Provider store={store}>
            <Nationalities {...props} />
        </Provider>
    );

    beforeEach(() => {
        nationalities = render(renderNationalities());
    });

    afterEach(() => {
        nationalities.unmount();
    });

    test('should display as expected', () => {
        const nationalitiesContainer = nationalities.getByTestId(NATIONALITIES_CONTAINER.ID);
        const backButton = nationalities.getByTestId(NATIONALITIES_BACK_BUTTON.ID);
        const saveButton = nationalities.getByTestId(NATIONALITIES_SAVE_BUTTON.ID);
        const chCheckbox = nationalities.getByTestId(NATIONALITIES_CHECKBOX_CH.ID);
        const esCheckbox = nationalities.getByTestId(NATIONALITIES_CHECKBOX_ES.ID);
        const frCheckbox = nationalities.getByTestId(NATIONALITIES_CHECKBOX_FR.ID);
        const gbCheckbox = nationalities.getByTestId(NATIONALITIES_CHECKBOX_GB.ID);

        expect(nationalitiesContainer).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(chCheckbox).toBeInTheDocument();
        expect(esCheckbox).toBeInTheDocument();
        expect(frCheckbox).toBeInTheDocument();
        expect(gbCheckbox).toBeInTheDocument();
        expect(nationalities).toMatchSnapshot();
    });

    test('should be trigger correctly when the user clicks the checkbox', () => {
        const checkbox = nationalities.getByTestId(NATIONALITIES_CHECKBOX_CH.ID).querySelector('input');
        fireEvent.change(checkbox, { target: { value: 'test' } });

        expect(checkbox).toBeChecked();
    });

    test('should be trigger correctly when the user clicks save button', () => {
        const saveButton = nationalities.getByTestId(NATIONALITIES_SAVE_BUTTON.ID);
        fireEvent.click(saveButton);
        expect(mockDispatch).toHaveBeenCalledWith(updateNationalitiesAction(['ch', 'es', 'fr', 'gb']));
    });
});
