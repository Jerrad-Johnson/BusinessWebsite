import {useEffect, useState} from "react";

export const orientations = {
    landscape: "landscape",
    portrait: "portrait",
}

function useScreenOrientation(){
    if (typeof screen !== "undefined"){
        const [screenOrientation, setScreenOrientation] = useState(screen.orientation.type);

        const updateOrientation = () => {
            setScreenOrientation((window.innerHeight >= window.innerWidth ? orientations.landscape : orientations.portrait));
        }

        useEffect(() => {
            window.addEventListener('resize', updateOrientation);
            return () => {
                window.removeEventListener('resize', updateOrientation);
            }
        }, [])

        return screenOrientation;
    }
    return orientations.landscape;
}

export default useScreenOrientation;
