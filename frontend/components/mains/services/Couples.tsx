import {NavbarOptions, OrientationOptions} from "../../../types/layout";
import {Dispatch, SetStateAction} from "react";
import MainLayout from "../../MainLayout";
import {
    serviceBasicsElems, serviceBulletsCouples, serviceBulletsSenior,
    serviceNotesElem, servicePreparationCouples,
    serviceTitle
} from "../../../common/serviceElements";

export function ServicesCouplesMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed}:{
    isUserMobile: boolean,
    width: number,
    screenOrientation: OrientationOptions
    navbarOpenOrClosed: NavbarOptions,
    setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>
}){

    return (
        <MainLayout isUserMobile={isUserMobile} width={width} navbarOpenOrClosed={navbarOpenOrClosed} setNavbarOpenOrClosed={setNavbarOpenOrClosed} screenOrientation={screenOrientation}>
            <br/>
            {serviceTitle.couples}
            <p>This service is for couples, engagements, etc. </p>
            {serviceBasicsElems}

            {serviceBulletsCouples}

            {serviceNotesElem}
            <p>You and your partner will have to sign a model release, which allows me to use the photos e.g. in this website{"'"}s gallery.</p>

            {servicePreparationCouples}
        </MainLayout>
    );
}

export default ServicesCouplesMain;