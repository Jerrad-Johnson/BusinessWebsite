import {OrientationOptions} from "../../types/layout";
import {BackgroundImage} from "../../utils/SharedBetweenPages";

export function ContactMain({isUserMobile, width, screenOrientation}: {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){

    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <BackgroundImage screenOrientation={screenOrientation}/>
                    <div className={"main__overlay"}>
                        <div className={"main__content"}>

                            <div className={"main__content--headline"}>Contact</div>

                            <p>Ideal Portraits is currently located in Rapid City, SD. </p>
                            <span><a href={"mailto:jerrad.johnson3@gmail.com"}>jerrad.johnson3@gmail.com</a></span>
                            <br/>
                            <span><a href={"tel:6056468941"}>(605) 646-8941</a> – Please text first, I do not answer for unknown numbers.</span>

                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}