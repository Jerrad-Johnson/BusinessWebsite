import {navbarOptions} from "../common/variables";
import {orientations} from "../hooks/useOrientation";

export type NavbarOptions = typeof navbarOptions[keyof typeof navbarOptions]
export type OrientationOptions = typeof orientations[keyof typeof orientations]

export interface GenericHeadAttributes {
    metaName?: string;
    content?: string;
}