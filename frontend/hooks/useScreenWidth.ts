import {useEffect, useState} from "react";

function useScreenWidth(){
    const [width, setWidth] = useState<number>(1920);

    const updateWidth = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        }
    }, []);

    return width;
}

export default useScreenWidth;
