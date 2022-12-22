import Link from "next/link";

function NavbarLinks(){
    return (
        <div className={"links"}>
            <ul>
                <li>
                    <Link href={"/"}>
                        <a style={{"--i": "0.05s"}}>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href={"/gallery"}>
                        <a style={{"--i": "0.15s"}}>Gallery</a>
                    </Link>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.15s"}}>Portfolio</a>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.2s"}}>Testimonials</a>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.25s"}}>About</a>
                </li>
                <li>
                    <a href="#" style={{"--i": "0.3s"}}>Contact</a>
                </li>
            </ul>
        </div>
    );
}

export default NavbarLinks;