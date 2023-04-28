import {navbarOptions} from "../common/variables";

function MainDiv({isUserMobile, width, navbarOpenOrClosed, setNavbarOpenOrClosed, children}){
    return (
        <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}
             onClick={(e) => {
                 if (navbarOpenOrClosed === navbarOptions.open) setNavbarOpenOrClosed(navbarOptions.closed);
             }}
        >
            {children}
        </div>
    )
}

export default MainDiv;