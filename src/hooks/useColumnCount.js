import { useState, useEffect } from 'react';

import { getMatchCount } from '@/utils/users.js';
import { MEDIA_QUERY_LIST } from '@/config/user.js';

const mediaQueryList = Object.values(MEDIA_QUERY_LIST);

export default function useColumnCount(initialCount) {
    const [columnCount, setColumnCount] = useState(initialCount);

    const checkMatch = media => {
        const count = getMatchCount(media);
        if (count) {
            setColumnCount(count);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const mediaMatchList = mediaQueryList.map(value => window.matchMedia(value));
            mediaMatchList.forEach(media => checkMatch(media));
            mediaMatchList.forEach(media => media.addEventListener('change', checkMatch));

            return () => mediaMatchList.forEach(media => media.removeEventListener('change', checkMatch));
        }
    }, []);

    return [columnCount, setColumnCount];
}
