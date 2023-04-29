import {NavbarOptions, OrientationOptions} from "../../../types/layout";
import {Dispatch, SetStateAction} from "react";
import MainLayout from "../../MainLayout";
import {
    serviceBulletsWedding,
    serviceTitle, serviceNotesWedding, serviceBasicsWedding, servicePreparationWedding
} from "../../../common/serviceElements";

export function ServicesWeddingMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed}:{
    isUserMobile: boolean,
    width: number,
    screenOrientation: OrientationOptions
    navbarOpenOrClosed: NavbarOptions,
    setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>
}){

    return (
        <MainLayout isUserMobile={isUserMobile} width={width} navbarOpenOrClosed={navbarOpenOrClosed} setNavbarOpenOrClosed={setNavbarOpenOrClosed} screenOrientation={screenOrientation}>
            <br/>
            {serviceTitle.wedding}
            {serviceBasicsWedding}

            <br/>
            {serviceBulletsWedding}

            {serviceNotesWedding}

            {servicePreparationWedding}
        </MainLayout>
    );
}

export default ServicesWeddingMain;