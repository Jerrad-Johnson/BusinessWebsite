import {navbarOptions} from "../common/variables";

export type NavbarOptions = navbarOptions.open | navbarOptions.closed;
export interface GenericHeadAttributes {
    metaName?: string;
    content?: string;
}