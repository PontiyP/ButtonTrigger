import {useState} from "react";

export const useUrlControl = () => {
    const [url, setUrl] = useState(() => localStorage.getItem('url') || 'https://ets.weplay.tv');

    const updateUrl = (value) => {
        setUrl(value);
        localStorage.setItem('url', value);
    };

    return { url, setUrl: updateUrl };
};
