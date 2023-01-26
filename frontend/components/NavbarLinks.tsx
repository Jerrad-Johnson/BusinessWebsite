import Link from "next/link";
import {cc, navbarOptions} from "../common/variables";
import {Dispatch, MouseEvent, SetStateAction} from "react";
import {NavbarOptions} from "../types/layout";

function NavbarLinks({setNavbarOpenOrClosed}: {setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}){
    return (
        <div className={"links"}>
            <ul>
                <li>
                    <Link href={"/"} passHref legacyBehavior>
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.05s"}}>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/gallery"} passHref legacyBehavior>
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.10s"}}>Gallery</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/gallery-map"}>
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.15s"}}>Gallery Map</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/testimonials"}>
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.20s"}}>Testimonials</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/about"}>
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.25s"}}>About</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/contact"}>
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.30s"}}>Contact</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

function navigationDelayHandler(e: MouseEvent, setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>){
    e.preventDefault();
    setNavbarOpenOrClosed(navbarOptions.closed);
    setTimeout(() => {
        const target = e.target;
        if(!(target instanceof Element)) return;
        const href = target.getAttribute("href");
        if(!href) return;
        window.location.href = href;
    }, 200);
}

export default NavbarLinks;