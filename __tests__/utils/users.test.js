import { getFilterUser } from '@/utils/users.js';

import { DEFAULT_NATIONALITIES } from '@/config/user.js';

import DATA from '../mockUsersData.json';

describe('Utility', () => {
    test('should trigger getFilterUser correctly with the nationality of GB', () => {
        const users = getFilterUser(DATA.results, ['gb'], '');
        const testResult = users.filter(({ nat }) => nat !== 'GB');

        expect(testResult.length).toBe(0);
    });

    test('should trigger getFilterUser correctly with the searchText of Mario', () => {
        const users = getFilterUser(DATA.results, DEFAULT_NATIONALITIES, 'Mario')[0];

        expect(users.name.first).toBe('Mario');
    });
});
