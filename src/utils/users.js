import { MEDIA_QUERY_LIST } from '@/config/user.js';

export const getFilterUser = (data = [], nationalities = [], searchText = '') => (
    data.filter(({ nat, name: { first, last } }) => {
        const name = (first + last).toLowerCase();
        const hasIncludeName = name.includes(searchText.toLowerCase());
        const hasIncludeNationality = nationalities.find(v => v.toLowerCase() === nat.toLowerCase());

        return hasIncludeName && hasIncludeNationality;
    })
);

export const getMatchCount = ({ matches, media }) => {
    if (!matches) return;
    let count = 4;
    switch (media) {
    case MEDIA_QUERY_LIST.MOBILE_WIDTH:
        count = 2;
        break;
    case MEDIA_QUERY_LIST.TABLET_WIDTH:
        count = 3;
        break;
    case MEDIA_QUERY_LIST.DESKTOP_WIDTH:
        count = 4;
        break;
    default:
        break;
    }
    return count;
};
