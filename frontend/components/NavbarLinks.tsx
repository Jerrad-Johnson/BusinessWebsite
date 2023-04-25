import Link from "next/link";
import {cc, navbarOptions} from "../common/variables";
import {Dispatch, MouseEvent, SetStateAction} from "react";
import {NavbarOptions} from "../types/layout";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import Basics from "./forEveryPage";

function NavbarLinks({setNavbarOpenOrClosed}: {setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}){
    const {dispatch} = Basics();
    return (
        <div className={"links"}>
            <ul>
                <li>
                    <Link href={"/"} passHref legacyBehavior>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.05s"}}>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/gallery"} passHref legacyBehavior>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.10s"}}>Gallery</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/gallery-map"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.15s"}}>Gallery Map</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/sessions"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.20s"}}>Sessions</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/about"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.25s"}}>About</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/contact"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.30s"}}>Contact</a>
                    </Link>
                </li>
                <hr/>
                <li>{/*@ts-ignore*/}
                    <a style={{"--i": "0.35s"}} onClick={(e) => { e.preventDefault(); dispatch(lightTheme()); }}>Light</a> &nbsp;{/*@ts-ignore*/}
                    <a style={{"--i": "0.35s"}} onClick={(e) => { e.preventDefault(); dispatch(darkTheme()); }}>Dark</a>
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