import {ReactElement, useState} from "react";

function Navbar({navOpenOrClosed, setNavOpenOrClosed}: {navOpenOrClosed: boolean, setNavOpenOrClosed: boolean}): ReactElement {

    return (
        <div className={"navbar"}>
            <div className={"menu"}>
                <h3 className={"logo"}>Ideal<span>Portraits</span></h3>
                <div className={"hamburger-menu"} onClick={(e) => {
                    navOpenOrClosed ? setNavOpenOrClosed(0) : setNavOpenOrClosed(1);
                }}>
                    <div className={"bar"}></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;