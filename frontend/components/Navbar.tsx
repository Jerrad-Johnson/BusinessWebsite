import {Dispatch, ReactElement, SetStateAction} from "react";
import {navbarOptions} from "../common/variables";
import {NavbarOptions} from "../types/layout";

function Navbar({navbarOpenOrClosed, setNavbarOpenOrClosed}: {navbarOpenOrClosed: NavbarOptions, setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}): ReactElement {

    return (
        <div className={"navbar" + (navbarOpenOrClosed === navbarOptions.open ? " navOpen" : "")}>
            <div className={"menu"}>
                <h3 className={"logo" + (navbarOpenOrClosed === navbarOptions.open ? " navOpen" : "")}>Ideal<span>Portraits</span></h3>
                <div className={"hamburger-menu"} onClick={(e) => {
                        navbarOpenOrClosed === navbarOptions.open ? setNavbarOpenOrClosed(navbarOptions.closed) : setNavbarOpenOrClosed(navbarOptions.open);
                }}>
                    <div className={"bar" + (navbarOpenOrClosed === navbarOptions.open ? " navOpen" : "")}></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;