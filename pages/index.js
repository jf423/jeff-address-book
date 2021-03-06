import Head from 'next/head';
import styled from 'styled-components';

import Users from '../src/components/Users.js';

import { flexRowCenterCenter } from '../src/style/flex.css.js';

import { INDEX_PAGE } from '../src/config/selectors.json';

export default function App() {
    return (
        <AppContainer data-selector-id={INDEX_PAGE.INDEX_CONTAINER.ID}>
            <Head>
                <title>Address Book App</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Users />
        </AppContainer>
    );
}

export const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    ${flexRowCenterCenter};
`;
