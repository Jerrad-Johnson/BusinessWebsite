import {orientations} from "../hooks/useOrientation";
import {cc} from "../common/variables";
import Image from "next/legacy/image";
import landscapeBackground from "../public/backgrounds/hp.jpg";
import portraitBackground from "../public/backgrounds/mw.jpg";

//@ts-ignore
export function BackgroundImage({screenOrientation}: {screenOrientation: orientations.landscape | orientations.portrait}){
    cc(orientations)
    return (
        <Image src={(screenOrientation === orientations.landscape ? landscapeBackground : portraitBackground)}
               placeholder={"blur"}
               layout={'fill'}
               objectFit={'cover'}
               objectPosition={'center'}
               alt={'Website Background Portrait'}/>
    );
}