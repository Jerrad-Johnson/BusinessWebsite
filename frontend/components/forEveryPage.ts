import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {NavbarOptions} from "../types/layout";
import {navbarOptions} from "../common/variables";
import useScreenOrientation from "../hooks/useOrientation";
import useScreenWidth from "../hooks/useScreenWidth";
import {isMobile} from "react-device-detect";

function Basics(){
    const dispatch: AppDispatch = useDispatch();
    const [navbarOpenOrClosed, setNavbarOpenOrClosed] = useState<NavbarOptions>(navbarOptions.closed);
    const screenOrientation = useScreenOrientation();
    const width = useScreenWidth();

    const [isUserMobile, setIsUserMobile] = useState(false);
    useEffect(() => {
        setIsUserMobile(isMobile);
    }, []);

    return ({dispatch, navbarOpenOrClosed, setNavbarOpenOrClosed, screenOrientation, width, isUserMobile, setIsUserMobile})

}

export default Basics;