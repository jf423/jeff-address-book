import Head from 'next/head';
import styled from 'styled-components';

import Nationalities from '../src/components/Nationalities.js';

import { flexRowCenterCenter } from '../src/style/flex.css.js';

import { SETTINGS_PAGE } from '../src/config/selectors.json';

export default function Settings() {
    return (
        <SettingsContainer data-selector-id={SETTINGS_PAGE.SETTINGS_CONTAINER.ID}>
            <Head>
                <title>Settings</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nationalities />
        </SettingsContainer>
    );
}

const SettingsContainer = styled.div`
    width: 100vw;
    height: 100vh;
    ${flexRowCenterCenter};
`;
