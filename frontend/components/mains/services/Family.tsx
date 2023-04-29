import {NavbarOptions, OrientationOptions} from "../../../types/layout";
import {Dispatch, SetStateAction} from "react";
import MainLayout from "../../MainLayout";
import {
    serviceBasicsElems, serviceBasicsFamily, serviceBulletsFamily, serviceBulletsSenior,
    serviceNotesElem,
    serviceTitle, servicePreparationFamily
} from "../../../common/serviceElements";

export function ServicesFamilyMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed}:{
    isUserMobile: boolean,
    width: number,
    screenOrientation: OrientationOptions
    navbarOpenOrClosed: NavbarOptions,
    setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>
}){

    return (
        <MainLayout isUserMobile={isUserMobile} width={width} navbarOpenOrClosed={navbarOpenOrClosed} setNavbarOpenOrClosed={setNavbarOpenOrClosed} screenOrientation={screenOrientation}>
            <br/>
            {serviceTitle.family}
            {serviceBasicsFamily}
            <p>Large families may receive the lower end of the quoted number of pictures.</p>

            {serviceBulletsFamily}

            {serviceNotesElem}
            <p>Each family member will have to sign a model release, which allows me to use the photos e.g. in this website{"'"}s gallery.</p>

            {servicePreparationFamily}
        </MainLayout>
    );
}

export default ServicesFamilyMain;