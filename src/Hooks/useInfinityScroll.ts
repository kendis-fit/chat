import { useState, useEffect, SetStateAction, Dispatch } from 'react';

const useInfiniteScroll = (callback: () => void): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        if (!isFetching) return;
        callback();
    }, [isFetching, callback]);

    function handleScroll() {
        console.log("test");
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }

    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;