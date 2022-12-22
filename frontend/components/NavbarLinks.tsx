import Link from "next/link";
import {cc, navbarOptions} from "../common/variables";

function NavbarLinks({setNavbarOpenOrClosed}){
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
                    <Link href={"/portfolio"}>
                        <a onClick={(e) => { navigationDelayHandler(e, setNavbarOpenOrClosed) }} style={{"--i": "0.15s"}}>Portfolio</a>
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

function navigationDelayHandler(e, setNavbarOpenOrClosed){
    e.preventDefault();
    setNavbarOpenOrClosed(navbarOptions.closed);
    setTimeout(() => {window.location.href = e.target.getAttribute('href')}, 200);
}

export default NavbarLinks;