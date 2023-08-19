const storagePrefix = 'people_generator_';

const storage = {
    getTheme: () => {
        return JSON.parse(window.localStorage.getItem(`${storagePrefix}theme`) as string);
    },
    setTheme: (theme: string) => {
        window.localStorage.setItem(`${storagePrefix}theme`, JSON.stringify(theme));
    }
};

export default storage;
