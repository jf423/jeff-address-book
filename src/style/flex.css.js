const flex = 'display: flex;';
const nowrap = 'flex-wrap: nowrap;';
const row = 'flex-direction: row;';
const col = 'flex-direction: column;';

export const flexRowStartStart = `
    ${flex}${nowrap}${row};
    justify-content: flex-start;
    align-items: flex-start;
`;

export const flexRowStartCenter = `
    ${flex}${nowrap}${row};
    justify-content: flex-start;
    align-items: center;
`;

export const flexRowCenterCenter = `
    ${flex}${nowrap}${row};
    justify-content: center;
    align-items: center;
`;

export const flexRowCenterStart = `
    ${flex}${nowrap}${row};
    justify-content: center;
    align-items: flex-start;
`;

export const flexRowEndCenter = `
    ${flex}${nowrap}${row};
    justify-content: flex-end;
    align-items: center;
`;

export const flexColStartStart = `
    ${flex}${nowrap}${col};
    justify-content: flex-start;
    align-items: flex-start;
`;

export const flexColStartCenter = `
    ${flex}${nowrap}${col};
    justify-content: flex-start;
    align-items: center;
`;

export const flexColCenterCenter = `
    ${flex}${nowrap}${col};
    justify-content: center;
    align-items: center;
`;

export const flexColCenterStart = `
    ${flex}${nowrap}${col};
    justify-content: center;
    align-items: flex-start;
`;
