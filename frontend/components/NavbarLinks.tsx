import Link from "next/link";
import {cc, NavbarLinkTitles, navbarOptions} from "../common/variables";
import {Dispatch, MouseEvent, SetStateAction} from "react";
import {NavbarOptions} from "../types/layout";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import Basics from "./forEveryPage";

function NavbarLinks({setNavbarOpenOrClosed}: {setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}){
    const {dispatch} = Basics();
    const linkTransitionTimes = Array.from({length: 22}).fill(5).map((e, i ) => (((i*5) / 100)  + 0.05).toFixed(2));
/*        let value = (((i*5) / 100)  + 0.05).toFixed(2);
        return value;
      if (string.length < 2) return `0.0${(i*5 + 0.05)}`;
        if (string.length > 2){
            arr = string.split("");
            arr.splice(-2, 0, ".");
            return arr.join("");
        }
        return `0.${string}`;
    });*/

    const linkElems = NavbarLinkTitles.map((e, k) => {
        <li key={k}>
            <Link href={"/"} passHref legacyBehavior>{/*@ts-ignore*/}
                <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": linkTransitionTimes[0]}}>Home</a>
            </Link>
        </li>
    })

    cc(linkTransitionTimes)

    return (
        <div className={"links"}>
            <ul>
                <li>
                    <Link href={"/"} passHref legacyBehavior>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": linkTransitionTimes[0]}}>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/gallery"} passHref legacyBehavior>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.10s"}}>Gallery</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/gallery-map"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.15s"}}>Geo Gallery</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/services"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.20s"}}>Services</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/about"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.25s"}}>About</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/bio"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.30s"}}>Bio</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/contact"}>{/*@ts-ignore*/}
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.35s"}}>Contact</a>
                    </Link>
                </li>
                <hr/>
                <li>{/*@ts-ignore*/}
                    <a style={{"--i": "0.40s"}} onClick={(e) => { e.preventDefault(); dispatch(lightTheme()); }}>Light</a> &nbsp;{/*@ts-ignore*/}
                    <a style={{"--i": "0.40s"}} onClick={(e) => { e.preventDefault(); dispatch(darkTheme()); }}>Dark</a>
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