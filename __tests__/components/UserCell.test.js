import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toHaveTextContent, toHaveValue } from '@testing-library/jest-dom/matchers';

import { USERS_CONFIG } from '../../src/config/user.js';
import { INDEX_PAGE } from '../../src/config/selectors.json';

import UserCell from '../../src/components/UserCell.js';

import DATA from '../mockUsersData.json';

expect.extend({ toBeInTheDocument, toHaveTextContent, toHaveValue });

const mockData = {
    data: {
        items: DATA.results,
        setSelectedIndex: jest.fn()
    },
    columnIndex: 0,
    rowIndex: 0,
    style: {}
};
const { NUM_COLUMNS } = USERS_CONFIG;
const {
    USER_CELL_CONTAINER,
    USER_CELL_CONTENT,
    USER_CELL_AVATAR,
    USER_CELL_NAME,
    USER_CELL_NATIONALITY,
    USER_CELL_USERNAME,
    USER_CELL_EMAIL
} = INDEX_PAGE;

describe('UserCell component test', () => {
    let userCell;
    const renderUserCell = props => (
        <UserCell {...props} />
    );

    beforeEach(() => {
        userCell = render(renderUserCell(mockData));
    });

    afterEach(() => {
        userCell.unmount();
    });

    test('should display as expected', () => {
        const itemIndex = mockData.rowIndex * NUM_COLUMNS + mockData.columnIndex;
        const item = DATA.results[itemIndex];
        const userCellContainer = userCell.container.querySelector(`[data-selector-id="${USER_CELL_CONTAINER.ID}_${itemIndex}"]`);
        const userCellContent = userCellContainer.querySelector(`[data-selector-id="${USER_CELL_CONTENT.ID}"]`);
        const userCellAvatar = userCellContainer.querySelector(`[data-selector-id="${USER_CELL_AVATAR.ID}"]`);
        const userCellName = userCellContainer.querySelector(`[data-selector-id="${USER_CELL_NAME.ID}"]`);
        const userCellNationality = userCellContainer.querySelector(`[data-selector-id="${USER_CELL_NATIONALITY.ID}"]`);
        const userCellUsername = userCellContainer.querySelector(`[data-selector-id="${USER_CELL_USERNAME.ID}"]`);
        const userCellEmail = userCellContainer.querySelector(`[data-selector-id="${USER_CELL_EMAIL.ID}"]`);

        expect(userCellContainer).toBeInTheDocument();
        expect(userCellContent).toBeInTheDocument();
        expect(userCellAvatar.src).toBe(item?.picture?.thumbnail);
        expect(userCellName).toHaveTextContent(`${item?.name?.first} ${item?.name?.last}`);
        expect(userCellNationality).toHaveTextContent(`(${item?.nat})`);
        expect(userCellUsername).toHaveTextContent(item?.login?.username);
        expect(userCellEmail).toHaveTextContent(item?.email);
        expect(userCell).toMatchSnapshot();
    });

    test('should be trigger correctly when the user clicks the cell', () => {
        const itemIndex = mockData.rowIndex * NUM_COLUMNS + mockData.columnIndex;
        const userCellContainer = userCell.container.querySelector(`[data-selector-id="${USER_CELL_CONTAINER.ID}_${itemIndex}"]`);
        const userCellContent = userCellContainer.querySelector(`[data-selector-id="${USER_CELL_CONTENT.ID}"]`);

        fireEvent.click(userCellContent);
        expect(mockData.data.setSelectedIndex).toHaveBeenCalledWith(itemIndex);
    });
});
