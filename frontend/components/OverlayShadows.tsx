import {useEffect, useState} from "react";
import useScreenWidth from "../hooks/useScreenWidth";
import {isMobile} from "react-device-detect";

function OverlayShadows({isUserMobile, width}){

    return (
        <>
            <div className={"shadow one" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}></div>
            <div className={"shadow two" + (isUserMobile === true ? " mobile" : "") + (width < 920 ? " narrow" : "")}></div>
        </>
    );
}

export default OverlayShadows;