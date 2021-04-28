import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toHaveTextContent, toHaveValue } from '@testing-library/jest-dom/matchers';

import { INDEX_PAGE } from '@/config/selectors.json';

import UserModal from '@/components/UserModal.js';

import DATA from '../mockUsersData.json';

expect.extend({ toBeInTheDocument, toHaveTextContent, toHaveValue });

const mockData = {
    open: true,
    selectedUser: DATA.results[0],
    setSelectedIndex: jest.fn()
};
const {
    USER_MODAL_CONTAINER,
    USER_MODAL_CLOSE_BUTTON,
    USER_MODAL_AVATAR,
    USER_MODAL_NAME,
    USER_MODAL_STREET,
    USER_MODAL_CITY,
    USER_MODAL_STATE,
    USER_MODAL_POSTCODE,
    USER_MODAL_PHONE,
    USER_MODAL_CELL
} = INDEX_PAGE;

describe('UserModal component test', () => {
    let userModal;
    const renderUserModal = props => (
        <UserModal {...props} />
    );

    beforeEach(() => {
        userModal = render(renderUserModal(mockData));
    });

    afterEach(() => {
        userModal.unmount();
    });

    test('should display as expected', () => {
        const { selectedUser } = mockData;
        const userModalContainer = userModal.getByTestId(USER_MODAL_CONTAINER.ID);
        const userModalCloseButton = userModal.getByTestId(USER_MODAL_CLOSE_BUTTON.ID);
        const userModalAvatar = userModal.getByTestId(USER_MODAL_AVATAR.ID);
        const userModalName = userModal.getByTestId(USER_MODAL_NAME.ID);
        const userModalStreet = userModal.getByTestId(USER_MODAL_STREET.ID);
        const userModalCity = userModal.getByTestId(USER_MODAL_CITY.ID);
        const userModalState = userModal.getByTestId(USER_MODAL_STATE.ID);
        const userModalPostcode = userModal.getByTestId(USER_MODAL_POSTCODE.ID);
        const userModalPhone = userModal.getByTestId(USER_MODAL_PHONE.ID);
        const userModalCell = userModal.getByTestId(USER_MODAL_CELL.ID);

        expect(userModalContainer).toBeInTheDocument();
        expect(userModalCloseButton).toBeInTheDocument();
        expect(userModalAvatar.src).toBe(selectedUser?.picture?.large);
        expect(userModalName).toHaveTextContent(`${selectedUser?.name?.first} ${selectedUser?.name?.last}`);
        expect(userModalStreet).toHaveTextContent(`${selectedUser?.location?.street?.number} ${selectedUser?.location?.street?.name}`);
        expect(userModalCity).toHaveTextContent(selectedUser?.location?.city);
        expect(userModalState).toHaveTextContent(selectedUser?.location?.state);
        expect(userModalPostcode).toHaveTextContent(selectedUser?.location?.postcode);
        expect(userModalPhone).toHaveTextContent(selectedUser?.phone);
        expect(userModalCell).toHaveTextContent(selectedUser?.cell);
        expect(userModal).toMatchSnapshot();
    });

    test('should be trigger correctly when the user clicks the cell', () => {
        const userModalCloseButton = userModal.getByTestId(USER_MODAL_CLOSE_BUTTON.ID);

        fireEvent.click(userModalCloseButton);
        expect(mockData.setSelectedIndex).toHaveBeenCalledWith(null);
    });
});
