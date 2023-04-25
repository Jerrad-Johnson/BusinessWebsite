import {OrientationOptions} from "../../types/layout";
import {useState} from "react";
import {reviews} from "../../common/reviews";
import useInterval from "beautiful-react-hooks/useInterval";
import indexStyles from "../../styles/Index.module.css";
import {BackgroundImage} from "../../utils/SharedBetweenPages";

export function IndexMain({isUserMobile, width, screenOrientation}:
                              {isUserMobile: boolean, width: number, screenOrientation: OrientationOptions}){

    const animationStates = Array.from({length: 6}).map((e, i) => `animationInstance${i}`);
    const [reviewNumber, setReviewNumber] = useState(0);
    const [instances, setInstances] = useState(0);
    const changeReview = () => {
        if (instances === animationStates.length-1){
            reviews.length-1 > reviewNumber ? setReviewNumber((prev) => prev+1) : setReviewNumber(0);
            setInstances(1);
        } else {
            setInstances((prev) => prev+1)
        }
    }
    useInterval(changeReview, 1750);

    return(
        <div className={"main-container"}>
            <div className={"main" + (isUserMobile ? " mobile" : "") + (width < 920 ? " narrow" : "")}>
                <header>
                    <BackgroundImage screenOrientation={screenOrientation}/>
                    <div className={indexStyles.overlay + " homeOverlay"}>
                        <div className={indexStyles.inner}>
                            <div className={"review--container " + animationStates[instances]}>
                                <div className={"review--comment"}>
                                    {`"`}{reviews[reviewNumber].content}{`"`}
                                </div>

                                <div className={"review--name"}>
                                    - {reviews[reviewNumber].name}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}