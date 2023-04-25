import {OrientationOptions} from "../../types/layout";
import {businessName, photoBodies, photoLenses, photoLighting, videoBodies, videoOther} from "../../common/variables";
import {BackgroundImage} from "../../utils/SharedBetweenPages";

export function AboutMain({isUserMobile, width, screenOrientation}: {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){
    const photoBodyElems = photoBodies.map((e, k) => (<li key={k}>{e}</li>));
    const photoLensesElems = photoLenses.map((e, k) => (<li key={k}>{e}</li>));
    const photoLightingElems = photoLighting.map((e, k) => (<li key={k}>{e}</li>));
    const videoBodyElems = videoBodies.map((e, k) => (<li key={k}>{e}</li>));
    const videoOtherElems = videoOther.map((e, k) => (<li key={k}>{e}</li>));

    return (
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <BackgroundImage screenOrientation={screenOrientation}/>
                    <div className={"main__overlay"}>
                        <div className={"main__content"}>
                            <div className={"main__content--headline"}>Intro</div>
                            <p>
                                Welcome to the {businessName} website. My name is Jerrad Johnson, and my portraiture style is very traditional. My models are posed to accentuate their most flattering features, present personality or mood, and complement the scene. I rarely capture candids, I believe my models should have the privilege of intentional presentation.
                            </p>

                            <p>
                                While this may sound difficult for you, it’s not – except for a bit of muscle fatigue! Because I will guide your pose, it’s quite simple.
                            </p>

                            <p>
                                My photo edits are usually mild. I may remove some blemishes and clear your skin, but I want my models to look <i>human</i>. I’m not a fan of the cake-like-skin style.
                            </p>

                            <div className={"main__content--headline"}>Contact</div>
                            <p>
                                <a href={"mailto:jerrad.johnson3@gmail.com"}>jerrad.johnson3@gmail.com</a>
                            </p>
                            <p>
                                <a href={"tel:6056468941"}>(605) 646-8941</a> – Please text first, I do not answer for unknown numbers.
                            </p>

                            <div className={"main__content--headline"}>Photography Equipment</div>
                            <div className={"main__content--equipment--main-container"}>
                                <div className={"main__content--two-col-list--sub-container"}>
                                    <div className={"main__content--equipment--sub-left"}>
                                        <div className={"main__content--two-col-list--subheading"}>
                                            Cameras
                                        </div>
                                        <ul>
                                            {photoBodyElems}
                                        </ul>

                                        <div className={"main__content--two-col-list--subheading"}>
                                            Lighting
                                        </div>
                                        <ul>
                                            {photoLightingElems}
                                        </ul>
                                    </div>
                                    <div className={"main__content--equipment--sub-right"}>
                                        <div className={"main__content--two-col-list--subheading"}>
                                            Lenses
                                        </div>
                                        <ul>
                                            {photoLensesElems}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className={"main__content--headline"}>Videography Equipment</div>
                            <div className={"main__content--equipment--main-container"}>
                                <div className={"main__content--two-col-list--sub-container"}>
                                    <div className={"main__content--equipment--sub-left"}>
                                        <div className={"main__content--two-col-list--subheading"}>
                                            Cameras
                                        </div>
                                        <ul>
                                            {videoBodyElems}
                                        </ul>

                                    </div>
                                    <div className={"main__content--equipment--sub-right"}>
                                        <div className={"main__content--two-col-list--subheading"}>
                                            Other
                                        </div>
                                        <ul>
                                            {videoOtherElems}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}