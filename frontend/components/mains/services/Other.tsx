import {NavbarOptions, OrientationOptions} from "../../../types/layout";
import {Dispatch, SetStateAction} from "react";
import MainLayout from "../../MainLayout";
import {
    serviceBasicsElems, serviceBasicsOther, serviceBulletsSenior,
    serviceNotesElem,
    servicePreparationElems,
    serviceTitle
} from "../../../common/serviceElements";

export function ServicesOtherMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed}:{
    isUserMobile: boolean,
    width: number,
    screenOrientation: OrientationOptions
    navbarOpenOrClosed: NavbarOptions,
    setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>
}){

    return (
        <MainLayout isUserMobile={isUserMobile} width={width} navbarOpenOrClosed={navbarOpenOrClosed} setNavbarOpenOrClosed={setNavbarOpenOrClosed} screenOrientation={screenOrientation}>
            <br/>
            {serviceTitle.senior}
            {serviceBasicsOther}

            {serviceBulletsSenior}

            {serviceNotesElem}
            <p>Depending on what sort of session it is, all parties (or their parents) may be asked to sign a model release, which allows me to use the photos e.g. in this website{"'"}s gallery.</p>

            {servicePreparationElems}
        </MainLayout>
    );
}

export default ServicesOtherMain;