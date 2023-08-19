import { useEffect, useState } from 'react';
import storage from 'utils/storage';

export const useDarkMode = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(storage.getTheme());
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark';

    const toggleTheme = () => {
        setTheme(oppositeTheme);
    };

    useEffect(() => {
        const changeTheme = () => {
            const root = window.document.documentElement;
            root.classList.remove(theme);
            root.classList.add(oppositeTheme);

            storage.setTheme(theme);
        };
        changeTheme();
    }, [theme]);

    return [oppositeTheme, toggleTheme] as const;
};
