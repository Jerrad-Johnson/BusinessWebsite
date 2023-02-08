import {Dispatch, ReactElement, SetStateAction} from "react";
import {navbarOptions, navbarStates} from "../common/variables";
import {NavbarOptions} from "../types/layout";
import HomeStyle from "../styles/Index.module.css";

function Navbar({navbarOpenOrClosed, setNavbarOpenOrClosed}: {navbarOpenOrClosed: NavbarOptions, setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}): ReactElement {
    return (
        <div className={"navbar"}>
            <div className={"navbar__menu" + (navbarOpenOrClosed === navbarOptions.open ? navbarStates.open : navbarStates.closed)}>
                <h3 className={"navbar__logo" + (navbarOpenOrClosed === navbarOptions.open ? navbarStates.open : navbarStates.closed)}>Ideal<span>Portraits</span></h3>
                <div className={"navbar__hamburger-menu"} onClick={(e) => {
                        navbarOpenOrClosed === navbarOptions.open ? setNavbarOpenOrClosed(navbarOptions.closed) : setNavbarOpenOrClosed(navbarOptions.open);
                }}>
                    <div className={"navbar__bar" + (navbarOpenOrClosed === navbarOptions.open ? navbarStates.open : navbarStates.closed)}></div>
                </div>
            </div>
        </div>
    );
}

export function HomeNavbar({navbarOpenOrClosed, setNavbarOpenOrClosed}: {navbarOpenOrClosed: NavbarOptions, setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}): ReactElement {
    return (
        <div className={"navbar--home"}>
            <div className={HomeStyle.menu}>
                <h3 className={HomeStyle.logo}>Ideal<span>Portraits</span></h3>
                <div className={"hamburger-menu"} onClick={(e) => {
                    navbarOpenOrClosed === navbarOptions.open ? setNavbarOpenOrClosed(navbarOptions.closed) : setNavbarOpenOrClosed(navbarOptions.open);
                }}>
                    <div className={"navbar__bar"}></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;