import Link from "next/link";
import {cc, NavbarLinkTitles, navbarOptions} from "../common/variables";
import {Dispatch, MouseEvent, SetStateAction, useEffect} from "react";
import {NavbarOptions} from "../types/layout";
import {darkTheme, lightTheme} from "../features/theme/themeSlice";
import Basics from "./forEveryPage";

function NavbarLinks({setNavbarOpenOrClosed}: {setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>}){
    const {dispatch} = Basics();
    const linkTransitionTimes = Array.from({length: NavbarLinkTitles.length+1})
        .fill(5)
        .map((e, i ) => (((i*5) / 100)  + 0.05)
        .toFixed(2))
        .map(e => `${e}s`);

    const linkElems = NavbarLinkTitles.map((elem, k) => {
        return (
            <li key={k}> {/*@ts-ignore*/}
                <Link href={elem.url} passHref legacyBehavior><a onClick={(event) => { navigationDelayHandler(event, setNavbarOpenOrClosed) }} style={{"--i": linkTransitionTimes[k]}}>{elem.title}</a></Link>
            </li>
        )
    });

    return (
        <div className={"links"}>
            <ul>
                {linkElems}{/*@ts-ignore*/}
                <hr style={{"--i": linkTransitionTimes[linkTransitionTimes.length-1]}}/>
                <li> {/*@ts-ignore*/}
                    <a style={{"--i": linkTransitionTimes[linkTransitionTimes.length-1]}} onClick={(e) => { e.preventDefault(); dispatch(lightTheme()); }}>Light</a> &nbsp; {/*@ts-ignore*/}
                    <a style={{"--i": linkTransitionTimes[linkTransitionTimes.length-1]}} onClick={(e) => { e.preventDefault(); dispatch(darkTheme()); }}>Dark</a>
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