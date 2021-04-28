import PropTypes from 'prop-types';
import styled from 'styled-components';

import { IconButton, Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { flexRowCenterCenter, flexColCenterCenter } from '@/style/flex.css.js';
import { eclipse, shadow } from '@/style/common.css.js';

import { INDEX_PAGE } from '@/config/selectors.json';

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

const UserModal = ({ open, selectedUser, setSelectedIndex }) => {
    const onCloseModal = () => {
        setSelectedIndex(null);
    };

    return (
        <Container
            data-selector-id={USER_MODAL_CONTAINER.ID}
            disableEnforceFocus
            disableAutoFocus
            open={open}
            onClose={onCloseModal}
            aria-labelledby={`${selectedUser?.name?.first} ${selectedUser?.name?.last}`}
        >
            <ModalContent>
                <CloseModalButton data-selector-id={USER_MODAL_CLOSE_BUTTON.ID} onClick={onCloseModal} aria-label="close modal">
                    <CloseIcon />
                </CloseModalButton>
                <Avatar data-selector-id={USER_MODAL_AVATAR.ID} src={selectedUser?.picture?.large} />
                <Name data-selector-id={USER_MODAL_NAME.ID}>
                    {`${selectedUser?.name?.first} ${selectedUser?.name?.last}`}
                </Name>
                <Info>
                    <Text data-selector-id={USER_MODAL_STREET.ID}>
                        {`Street: ${selectedUser?.location?.street?.number} ${selectedUser?.location?.street?.name}`}
                    </Text>
                    <Text data-selector-id={USER_MODAL_CITY.ID}>
                        {`City: ${selectedUser?.location?.city}`}
                    </Text>
                    <Text data-selector-id={USER_MODAL_STATE.ID}>
                        {`State: ${selectedUser?.location?.state}`}
                    </Text>
                    <Text data-selector-id={USER_MODAL_POSTCODE.ID}>
                        {`Postcode: ${selectedUser?.location?.postcode}`}
                    </Text>
                    <Text data-selector-id={USER_MODAL_PHONE.ID}>
                        {`Phone: ${selectedUser?.phone}`}
                    </Text>
                    <Text data-selector-id={USER_MODAL_CELL.ID}>
                        {`Cell: ${selectedUser?.cell}`}
                    </Text>
                </Info>
            </ModalContent>
        </Container>
    );
};

export default UserModal;

UserModal.defaultProps = {
    open: false,
    selectedUser: null
};

UserModal.propTypes = {
    open: PropTypes.bool,
    selectedUser: PropTypes.object,
    setSelectedIndex: PropTypes.func.isRequired
};

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

const CloseModalButton = styled(IconButton)``;

const Container = styled(Modal)`
    ${flexRowCenterCenter};
`;

const ModalContent = styled.div`
    position: relative;
    width: auto;
    height: auto;
    padding: 20px;
    background: #fff;
    ${shadow};
    ${flexColCenterCenter};

    ${Avatar} {
        width: 250px;
        height: 250px;
    }
    ${CloseModalButton} {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;
