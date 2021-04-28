import { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';

import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { flexColStartCenter } from '@/style/flex.css.js';

import { updateUserDataAction } from '@/ducks/modules/users.js';
import { USERS_CONFIG, END_POINT } from '@/config/user.js';
import { INDEX_PAGE } from '@/config/selectors.json';

import useColumnCount from '@/hooks/useColumnCount.js';

import { getFilterUser } from '@/utils/users.js';

import Search from './Search‌.js';
import UserModal from './UserModal.js';
import UserCell from './UserCell.js';

const {
    NUM_COLUMNS,
    BATCH_NUM,
    MAXIMUM_COUNT,
    ITEM_WIDTH,
    ITEM_HEIGHT
} = USERS_CONFIG;
const {
    USER_CONTAINER,
    USER_CONTENT,
    USER_CATALOG_END
} = INDEX_PAGE;

const Users = () => {
    const dispatch = useDispatch();
    const { searchText, nationalities, userData } = useSelector(state => state);
    const users = useMemo(() => getFilterUser(userData, nationalities, searchText), [userData, nationalities, searchText]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isScrollToEnd, setScrollToEnd] = useState(false);
    const [isDisableSnackbar, setDisableSnackbar] = useState(false);
    const [columnCount] = useColumnCount(NUM_COLUMNS);

    const userCount = users.length;
    const loadingColumn = new Array(columnCount).fill({});
    const items = (userCount < MAXIMUM_COUNT && !searchText) ? users.concat(loadingColumn) : users;

    const onCloseSnackbar = useCallback(() => {
        setDisableSnackbar(true);
    }, []);
    const onLoadMore = () => {
        if (searchText) return;

        return fetch(`${END_POINT}?results=${BATCH_NUM}&nat=${nationalities.join()}`)
            .then(res => res.json())
            .then(({ results }) => {
                dispatch(updateUserDataAction(users.concat(results)));
            });
    };
    const isItemLoaded = index => {
        if (userCount === MAXIMUM_COUNT && userCount === index + 1) {
            setScrollToEnd(true);
        }
        return index < userCount;
    };

    return (
        <Container width={ITEM_WIDTH * columnCount} data-selector-id={USER_CONTAINER.ID}>
            <SearchHeader />
            <UsersContent data-selector-id={USER_CONTENT.ID}>
                <AutoSizer>
                    {({ width, height }) => (
                        <InfiniteLoader
                            itemCount={items.length}
                            isItemLoaded={isItemLoaded}
                            loadMoreItems={onLoadMore}
                        >
                            {({ onItemsRendered, ref }) => (
                                <Grid
                                    ref={ref}
                                    width={width}
                                    height={height}
                                    columnWidth={ITEM_WIDTH}
                                    rowHeight={ITEM_HEIGHT}
                                    columnCount={columnCount}
                                    rowCount={Math.ceil(items.length / columnCount)}
                                    itemData={{ items, columnCount, setSelectedIndex }}
                                    onItemsRendered={gridProps => onItemsRendered({
                                        overscanStartIndex: gridProps.overscanRowStartIndex * columnCount,
                                        overscanStopIndex: gridProps.overscanRowStopIndex * columnCount,
                                        visibleStartIndex: gridProps.visibleRowStartIndex * columnCount,
                                        visibleStopIndex: gridProps.visibleRowStopIndex * columnCount
                                    })}
                                >
                                    {UserCell}
                                </Grid>
                            )}
                        </InfiniteLoader>
                    )}
                </AutoSizer>
            </UsersContent>
            <UserModal open={Boolean(users[selectedIndex])} selectedUser={users[selectedIndex]} setSelectedIndex={setSelectedIndex} />
            <Snackbar
                data-selector-id={USER_CATALOG_END.ID}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={!isDisableSnackbar && isScrollToEnd}
                message="End‌ ‌of‌ ‌users‌ ‌catalog!"
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={onCloseSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Container>
    );
};

export default Users;

const Container = styled.div`
    width: ${({ width }) => width}px;
    height: 100%;
    ${flexColStartCenter};
`;

const SearchHeader = styled(Search)`
    width: 100%;
    height: 40px;
    margin-top: 15px;
    
    @media (max-width: 480px) {
        width: auto;
    }
`;

const UsersContent = styled.div`
    width: 100%;
    height: calc(100% - 75px);
`;
