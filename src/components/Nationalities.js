import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
    Button,
    IconButton,
    Checkbox,
    FormGroup,
    FormControlLabel
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { shadow } from '@/style/common.css.js';
import { flexColStartCenter, flexRowStartCenter } from '@/style/flex.css.js';

import { updateNationalitiesAction } from '@/ducks/modules/users.js';
import { DEFAULT_NATIONALITIES_DATA } from '@/config/user.js';
import { SETTINGS_PAGE } from '@/config/selectors.json';

const { NATIONALITIES_CONTAINER, NATIONALITIES_BACK_BUTTON, NATIONALITIES_SAVE_BUTTON } = SETTINGS_PAGE;

export default function Nationalities() {
    const dispatch = useDispatch();
    const { nationalities } = useSelector(state => state);
    const [nat, setNat] = useState(nationalities);
    const settings = nat.reduce((sum, value) => ({ ...sum, [value]: true }), {});
    const onChange = event => {
        if (!event.target) return;

        const { name } = event.target;
        const newNat = settings[name] ? nat.filter(v => v !== name) : nat.concat(name);
        setNat(newNat);
    };
    const onSetNationalities = useCallback(() => {
        dispatch(updateNationalitiesAction(nat));
    }, [dispatch, nat]);
    return (
        <Container data-selector-id={NATIONALITIES_CONTAINER.ID}>
            <Header>
                <Link href="/">
                    <IconButton data-selector-id={NATIONALITIES_BACK_BUTTON.ID} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
            </Header>
            <SettingsContent>
                <FormGroup>
                    {DEFAULT_NATIONALITIES_DATA.map(({ name, label, selector }) => (
                        <FormControlLabel
                            key={selector}
                            control={<Checkbox data-selector-id={selector} checked={Boolean(settings[name])} onChange={onChange} name={name} />}
                            label={label}
                        />
                    ))}
                </FormGroup>
                <Button data-selector-id={NATIONALITIES_SAVE_BUTTON.ID} variant="contained" onClick={onSetNationalities} color="primary">
                    Save
                </Button>
            </SettingsContent>
        </Container>
    );
}

const Container = styled.div`
    width: 1000px;
    height: 100%;
    ${flexColStartCenter};
`;

const Header = styled.div`
    width: 100%;
    height: 40px;
    margin-top: 15px;
    padding: 10px;
    padding-left: 15px;
    ${shadow};
    ${flexRowStartCenter};
`;

const SettingsContent = styled.div`
    width: auto;
    height: calc(100% - 75px);
    padding-top: 20px;
`;
