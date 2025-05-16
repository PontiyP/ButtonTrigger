import {generateScriptFromOSC} from "../oscHandler";

export const useOscExecutor = (webviewRef) => {
    return (msg) => {
        const script = generateScriptFromOSC(msg);
        webviewRef.current?.executeJavaScript(script);
    };
};
