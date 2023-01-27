import {Dispatch, ReactElement, SetStateAction} from "react";
import {navbarOptions} from "../common/variables";
import {NavbarOptions} from "../types/layout";
import HomeStyle from "../styles/Index.module.css";

function Navbar({navbarOpenOrClosed, setNavbarOpenOrClosed}: {navbarOpenOrClosed: NavbarOptions, setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}): ReactElement {

    return (
        <div className={"navbar"}>
            <div className={"menu" + (navbarOpenOrClosed === navbarOptions.open ? " navOpen" : "")}>
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

export function HomeNavbar({navbarOpenOrClosed, setNavbarOpenOrClosed}: {navbarOpenOrClosed: NavbarOptions, setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}): ReactElement {

    return (
        <div className={"navbar"}>
            <div className={HomeStyle.menu}>
                <h3 className={HomeStyle.logo}>Ideal<span>Portraits</span></h3>
                <div className={"hamburger-menu"} onClick={(e) => {
                    navbarOpenOrClosed === navbarOptions.open ? setNavbarOpenOrClosed(navbarOptions.closed) : setNavbarOpenOrClosed(navbarOptions.open);
                }}>
                    <div className={"bar home"}></div>
                </div>
            </div>
        </div>
    );
}



export default Navbar;