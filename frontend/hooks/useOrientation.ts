import {useEffect, useState} from "react";
import {OrientationOptions} from "../types/layout";

export const orientations = {
    landscape: "landscape",
    portrait: "portrait",
}

function useScreenOrientation(){
    const [screenOrientation, setScreenOrientation] = useState<OrientationOptions>(orientations.landscape);

    const updateOrientation = () => {
        setScreenOrientation(
            window.innerHeight >= window.innerWidth
            ? orientations.portrait
            : orientations.landscape
        );
    }

    useEffect(() => {
        updateOrientation();
        window.addEventListener('resize', updateOrientation);
        return () => {
            window.removeEventListener('resize', updateOrientation);
        }
    }, []);

    return screenOrientation;
}

export default useScreenOrientation;
