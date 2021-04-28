import { SETTINGS_PAGE } from './selectors.json';

const {
    NATIONALITIES_CHECKBOX_CH,
    NATIONALITIES_CHECKBOX_ES,
    NATIONALITIES_CHECKBOX_FR,
    NATIONALITIES_CHECKBOX_GB
} = SETTINGS_PAGE;

export const USERS_CONFIG = {
    NUM_COLUMNS: 4,
    BATCH_NUM: 50,
    MAXIMUM_COUNT: 150,
    ITEM_WIDTH: 180,
    ITEM_HEIGHT: 300
};

export const END_POINT = 'https://randomuser.me/api/';

export const DEFAULT_NATIONALITIES = ['ch', 'es', 'fr', 'gb'];

export const DEFAULT_NATIONALITIES_DATA = [
    {
        selector: NATIONALITIES_CHECKBOX_CH.ID,
        name: 'ch',
        label: 'Switzerland (CH)'
    },
    {
        selector: NATIONALITIES_CHECKBOX_ES.ID,
        name: 'es',
        label: 'Spain (ES)'
    },
    {
        selector: NATIONALITIES_CHECKBOX_FR.ID,
        name: 'fr',
        label: 'France (FR)'
    },
    {
        selector: NATIONALITIES_CHECKBOX_GB.ID,
        name: 'gb',
        label: 'United Kingdom (GB)'
    }
];

export const MEDIA_QUERY_LIST = {
    MOBILE_WIDTH: '(max-width: 780px)',
    TABLET_WIDTH: '(min-width: 780px) and (max-width: 1000px)',
    DESKTOP_WIDTH: '(min-width: 1000px)'
};
