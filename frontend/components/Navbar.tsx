import {ReactElement, useState} from "react";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import {closeNavBar, navbarOpenOrClosedOptions, openNavBar} from "../features/navbar/navbarOpenOrClosedSlice";

function Navbar(): ReactElement {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className={"navbar"}>
            <div className={"menu"}>
                <h3 className={"logo"}>Ideal<span>Portraits</span></h3>
                <div className={"hamburger-menu"} onClick={(e) => {
                    localStorage.getItem("navBarOpenOrClosed") === navbarOpenOrClosedOptions.open ? dispatch(closeNavBar()) : dispatch(openNavBar());
                }}>
                    <div className={"bar"}></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;