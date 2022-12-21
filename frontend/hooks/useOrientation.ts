import {useEffect, useState} from "react";
const cc = console.log;

export const orientations = {
    landscape: "landscape-primary",
    portrait: "portrait-primary",
}

function useScreenOrientation(){
    if (typeof screen !== "undefined"){
        const [screenOrientation, setScreenOrientation] = useState(screen.orientation.type);

        const updateOrientation = () => {
            setScreenOrientation(screen.orientation.type);
        }

        useEffect(() => {
            window.addEventListener('resize', updateOrientation);

            return () => {
                window.removeEventListener('resize', updateOrientation);
            }
        }, [])
        return screenOrientation;
    }
    return null;
}

export default useScreenOrientation;