import PropTypes from 'prop-types';
import styled from 'styled-components';

import { flexRowCenterCenter, flexColCenterCenter } from '../style/flex.css.js';
import { eclipse, shadow } from '../style/common.css.js';

import { USERS_CONFIG } from '../config/user.js';
import { INDEX_PAGE } from '../config/selectors.json';

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

const UserCell = ({
    data: { items, setSelectedIndex },
    columnIndex,
    rowIndex,
    style
}) => {
    const itemIndex = rowIndex * NUM_COLUMNS + columnIndex;
    const itemData = items[itemIndex];

    const onClick = () => {
        setSelectedIndex(itemIndex);
    };

    if (!itemData) {
        return null;
    }
    return (
        <Card data-selector-id={`${USER_CELL_CONTAINER.ID}_${itemIndex}`} style={style}>
            <CardContent data-selector-id={USER_CELL_CONTENT.ID} onClick={onClick}>
                <Avatar data-selector-id={USER_CELL_AVATAR.ID} src={itemData?.picture?.thumbnail} />
                <Name data-selector-id={USER_CELL_NAME.ID}>
                    { itemData.name ? `${itemData?.name?.first} ${itemData?.name?.last}` : 'Loading'}
                </Name>
                <Info>
                    <Text data-selector-id={USER_CELL_NATIONALITY.ID}>{itemData.nat && `(${itemData?.nat})`}</Text>
                    <Text data-selector-id={USER_CELL_USERNAME.ID}>{itemData?.login?.username}</Text>
                    <Text data-selector-id={USER_CELL_EMAIL.ID}>{itemData?.email}</Text>
                </Info>
            </CardContent>
        </Card>
    );
};

export default UserCell;

UserCell.propTypes = {
    data: PropTypes.shape({
        items: PropTypes.array.isRequired,
        setSelectedIndex: PropTypes.func.isRequired
    }).isRequired,
    columnIndex: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired
};

const Card = styled.div`
    ${flexRowCenterCenter};
`;

const CardContent = styled.div`
    position: relative;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    ${shadow};
    ${flexColCenterCenter};

    &:before {
        content: '';
        width: 100%;
        height: 75px;
        background-color: #b2b2b2;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
`;

const Avatar = styled.img`
    border: 5px solid #fff;
    background: #ddd;
    border-radius: 100%;
    width: 100px;
    height: 100px;
`;

const Name = styled.h2`
    text-align: center;
    max-width: 100%;
    ${eclipse};
`;

const Info = styled.div`
    width: 100%;
    min-height: 80px;
    ${flexColCenterCenter};
`;

const Text = styled.span`
    max-width: 100%;
    padding: 5px;
    color: #6c757d;
    ${eclipse};
`;
