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
                            <div className={"main__content--subheading"}>Method</div>
                            <p>
                                Welcome to {businessName}. My name is Jerrad Johnson, and I use a very traditional portraiture style. My clients are posed to accentuate their most flattering features and complement the scene. It{"'"}s rare for me to capture candids, I believe you should have the privilege of intentional presentation.
                            </p>

                            <p>
                                While this may sound difficult for you, it’s not – except for a bit of muscle fatigue! Because I will guide your poses, it’s quite simple.
                            </p>

                            <p>
                                My photo edits are usually mild. I may remove some blemishes and clear your skin, but I want my models to look <i>human</i>. I avoid the cake-like-skin style.
                            </p>


                            <div className={"main__content--subheading"}>Subcontract Work</div>

                            <p>
                                I{"'"}m open to subcontracting to your media business, and we will need to discuss pricing and expectations. Equipment:
                            </p>

                            <div className={"main__content--equipment-headline"}>Photography</div>
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

                            <div className={"main__content--equipment-headline"}>Videography</div>
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