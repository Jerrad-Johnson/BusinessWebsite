import {ReactElement} from "react";
import {navbarOptions} from "../common/variables";

function Navbar({navbarOpenOrClosed, setNavbarOpenOrClosed}): ReactElement {

    return (
        <div className={"navbar"}>
            <div className={"menu"}>
                <h3 className={"logo"}>Ideal<span>Portraits</span></h3>
                <div className={"hamburger-menu"} onClick={(e) => {
                    navbarOpenOrClosed === navbarOptions.open ? setNavbarOpenOrClosed(navbarOptions.closed) : setNavbarOpenOrClosed(navbarOptions.open);
                }}>
                    <div className={"bar"}></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;