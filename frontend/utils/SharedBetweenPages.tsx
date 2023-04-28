import {orientations} from "../hooks/useOrientation";
import Image from "next/legacy/image";
import landscapeBackground from "../public/backgrounds/hp.jpg";
import portraitBackground from "../public/backgrounds/mw.jpg";
import {cc} from "../common/variables";

//@ts-ignore
export function BackgroundImage({screenOrientation}: {screenOrientation: orientations.landscape | orientations.portrait}){
    return (
        <Image src={(screenOrientation === orientations.landscape ? landscapeBackground : portraitBackground)}
               placeholder={"blur"}
               layout={'fill'}
               objectFit={'cover'}
               objectPosition={'center'}
               alt={'Website Background Portrait'}/>
    );
}