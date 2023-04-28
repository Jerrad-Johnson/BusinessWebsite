import {navbarOptions} from "../common/variables";
import {BackgroundImage} from "../utils/SharedBetweenPages";
import {NavbarOptions, OrientationOptions} from "../types/layout";
import {Dispatch, ReactNode, SetStateAction} from "react";

function MainLayout({isUserMobile, width, navbarOpenOrClosed, setNavbarOpenOrClosed, children, screenOrientation}:{
    isUserMobile: boolean,
    width: number,
    screenOrientation: OrientationOptions,
    navbarOpenOrClosed: NavbarOptions,
    setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>,
    children: ReactNode
}){
    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}
                 onClick={(e) => {
                     if (navbarOpenOrClosed === navbarOptions.open) setNavbarOpenOrClosed(navbarOptions.closed);
                 }}
            >
                <BackgroundImage screenOrientation={screenOrientation}/>
                <header>
                    <div className={"main__overlay"}>
                        <div className={"main__content" + (navbarOpenOrClosed === navbarOptions.closed ? "" : " hidden")}>
                            {children}
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default MainLayout;