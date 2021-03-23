export const getFilterUser = (data = [], nationalities = [], searchText = '') => (
    data.filter(({ nat, name: { first, last } }) => {
        const name = (first + last).toLowerCase();
        const hasIncludeName = name.includes(searchText.toLowerCase());
        const hasIncludeNationality = nationalities.find(v => v.toLowerCase() === nat.toLowerCase());

        return hasIncludeName && hasIncludeNationality;
    })
);
