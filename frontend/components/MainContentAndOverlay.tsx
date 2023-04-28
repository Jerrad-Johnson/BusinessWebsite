import {navbarOptions} from "../common/variables";

function MainContentAndOverlay({navbarOpenOrClosed, children}){
    return (
        <div className={"main__overlay"}>
            <div className={"main__content" + (navbarOpenOrClosed === navbarOptions.closed ? "" : " hidden")}>
                {children}
            </div>
        </div>
    );
}

export default MainContentAndOverlay;