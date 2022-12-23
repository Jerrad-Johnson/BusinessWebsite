import {useEffect, useState} from "react";

export const orientations = {
    landscape: "landscape",
    portrait: "portrait",
}

function useScreenOrientation(){
    if (typeof screen !== "undefined"){
        const [screenOrientation, setScreenOrientation] = useState(orientations.landscape);

        const updateOrientation = () => {
            setScreenOrientation(
                window.innerHeight >= window.innerWidth
                ? orientations.portrait
                : orientations.landscape
            );
        }

        useEffect(() => {
            setScreenOrientation(updateOrientation());
            window.addEventListener('resize', updateOrientation);
            return () => {
                window.removeEventListener('resize', updateOrientation);
            }
        }, []);

        return screenOrientation;
    }
    return orientations.landscape;
}

export default useScreenOrientation;
