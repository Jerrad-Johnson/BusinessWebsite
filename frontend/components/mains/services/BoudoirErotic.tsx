import {NavbarOptions, OrientationOptions} from "../../../types/layout";
import {Dispatch, SetStateAction} from "react";
import MainLayout from "../../MainLayout";
import {
    serviceBasicsBoudoir, serviceBulletsBoudoir,
    serviceNotesElem, servicePreparationBoudoir,
    serviceTitle
} from "../../../common/serviceElements";

export function ServicesBoudoirEroticMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed}:{
    isUserMobile: boolean,
    width: number,
    screenOrientation: OrientationOptions
    navbarOpenOrClosed: NavbarOptions,
    setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>
}){

    return (
        <MainLayout isUserMobile={isUserMobile} width={width} navbarOpenOrClosed={navbarOpenOrClosed} setNavbarOpenOrClosed={setNavbarOpenOrClosed} screenOrientation={screenOrientation}>
            <br/>
            {serviceTitle.boudoir}
            {serviceBasicsBoudoir}

            {serviceBulletsBoudoir}

            {serviceNotesElem}

            {servicePreparationBoudoir}
        </MainLayout>
    );
}

export default ServicesBoudoirEroticMain;