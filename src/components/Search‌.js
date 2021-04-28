import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    Tooltip, InputBase, Divider, IconButton
} from '@material-ui/core';
import {
    Settings as SettingsIcon,
    Search as SearchIcon,
    Close as CloseIcon
} from '@material-ui/icons';

import { shadow } from '@/style/common.css.js';
import { flexRowStartCenter } from '@/style/flex.css.js';

import { setSearchTextAction } from '@/ducks/modules/users.js';
import { INDEX_PAGE } from '@/config/selectors.json';

const {
    SEARCH_CONTAINER,
    SEARCH_INPUT,
    SEARCH_CLEAR,
    SEARCH_BUTTON
} = INDEX_PAGE;

export default function Search({ className }) {
    const dispatch = useDispatch();
    const { searchText } = useSelector(state => state);
    const [text, setText] = useState(searchText);
    const onSearch = () => {
        dispatch(setSearchTextAction(text));
    };
    const onChange = (event = {}) => {
        if (!event.target) return;

        setText(event.target.value);
    };
    const onClear = useCallback(() => {
        setText('');
        dispatch(setSearchTextAction(''));
    }, [dispatch]);
    const onKeyDown = event => {
        if (event && event.keyCode === 13) {
            onSearch();
        }
    };
    return (
        <Container data-selector-id={SEARCH_CONTAINER.ID} className={className}>
            <Tooltip title="Searching will pause‌ ‌the‌ ‌loading‌ ‌mechanism‌ due to the limitation of Random User API.">
                <SearchInput
                    data-selector-id={SEARCH_INPUT.ID}
                    value={text}
                    placeholder="Search User"
                    inputProps={{ 'aria-label': 'search user' }}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            </Tooltip>
            <CloseButton data-selector-id={SEARCH_CLEAR.ID} visible={text ? 'visible' : 'hidden'} onClick={onClear} aria-label="clear">
                <CloseIcon />
            </CloseButton>
            <IconButton data-selector-id={SEARCH_BUTTON.ID} onClick={onSearch} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider orientation="vertical" />
            <Link href="/settings">
                <IconButton color="primary" aria-label="settings">
                    <SettingsIcon />
                </IconButton>
            </Link>
        </Container>
    );
}

Search.defaultProps = {
    className: ''
};

Search.propTypes = {
    className: PropTypes.string
};

const Container = styled.div`
    ${flexRowStartCenter};
    ${shadow};
    padding: 10px;
    padding-left: 15px;
`;

const SearchInput = styled(InputBase)`
    flex: 1;
`;

const CloseButton = styled(IconButton)`
    visibility: ${({ visible }) => visible};
`;
