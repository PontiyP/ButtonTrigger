import {useState} from "react";

export const useOscPortControl = () => {
    const [oscPort, setOscPort] = useState(() => parseInt(localStorage.getItem('oscPort')) || 3333);

    const applyPort = () => {
        if (!isNaN(oscPort)) {
            localStorage.setItem('oscPort', oscPort);
            window.electronAPI.changeOscPort(oscPort);
        }
    };

    return { oscPort, setOscPort, applyPort };
};
