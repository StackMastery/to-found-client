import { useEffect } from "react";

const PreventPageLeave = ({ isEnabled = true }) => {
    useEffect(() => {
        if (!isEnabled) return;

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; 
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isEnabled]);

    return null;
};

export default PreventPageLeave