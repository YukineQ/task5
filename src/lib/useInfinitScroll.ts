import { useEffect } from 'react';

const useInfinitScroll = (callback: Function) => {
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight * 0.99
            ) {
                callback();
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [callback]);
};

export default useInfinitScroll;
