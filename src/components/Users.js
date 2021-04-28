import { useState } from 'react';
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

const LOADING_COLUMNS = new Array(NUM_COLUMNS).fill({});

const Users = () => {
    const dispatch = useDispatch();
    const { searchText, nationalities } = useSelector(state => state);
    const userData = useSelector(state => getFilterUser(state.userData, nationalities, searchText));
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isScrollToEnd, setScrollToEnd] = useState(false);
    const [isDisableSnackbar, setDisableSnackbar] = useState(false);
    const userCount = userData.length;
    const items = (userCount < MAXIMUM_COUNT && !searchText) ? userData.concat(LOADING_COLUMNS) : userData;

    const onCloseSnackbar = () => {
        setDisableSnackbar(true);
    };
    const onLoadMore = () => {
        if (searchText) return;

        return fetch(`${END_POINT}?results=${BATCH_NUM}&nat=${nationalities.join()}`)
            .then(res => res.json())
            .then(({ results }) => {
                dispatch(updateUserDataAction(userData.concat(results)));
            });
    };
    const isItemLoaded = index => {
        if (userCount === MAXIMUM_COUNT && userCount === index + 1) {
            setScrollToEnd(true);
        }
        return index < userCount;
    };

    return (
        <Container data-selector-id={USER_CONTAINER.ID}>
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
                                    columnCount={NUM_COLUMNS}
                                    rowCount={Math.ceil(items.length / NUM_COLUMNS)}
                                    itemData={{ items, setSelectedIndex }}
                                    onItemsRendered={gridProps => onItemsRendered({
                                        overscanStartIndex: gridProps.overscanRowStartIndex * NUM_COLUMNS,
                                        overscanStopIndex: gridProps.overscanRowStopIndex * NUM_COLUMNS,
                                        visibleStartIndex: gridProps.visibleRowStartIndex * NUM_COLUMNS,
                                        visibleStopIndex: gridProps.visibleRowStopIndex * NUM_COLUMNS
                                    })}
                                >
                                    {UserCell}
                                </Grid>
                            )}
                        </InfiniteLoader>
                    )}
                </AutoSizer>
            </UsersContent>
            <UserModal open={Boolean(userData[selectedIndex])} selectedUser={userData[selectedIndex]} setSelectedIndex={setSelectedIndex} />
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
    width: ${ITEM_WIDTH * NUM_COLUMNS}px;
    height: 100%;
    ${flexColStartCenter};
`;

const SearchHeader = styled(Search)`
    width: 100%;
    height: 40px;
    margin-top: 15px;
`;

const UsersContent = styled.div`
    width: 100%;
    height: calc(100% - 75px);
`;
