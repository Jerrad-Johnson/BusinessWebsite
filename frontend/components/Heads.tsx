import Head from "next/head";
import {businessName, cc} from "../common/variables";
import {GenericHeadAttributes} from "../types/layout";

const linkRel = ( <link rel="icon" href="/favicon.ico" /> );

export function GenericHead({metaName, content}: GenericHeadAttributes){ // TODO Update all pages to use this format; param. metaName is no longer used.

/*    let fontFamilies = [
        "Arapey",
        "Libre+Baskerville",
        "Taviraj",
        "Alegreya",
        "Allura",
    ]*/

    let fontFamilies = "Arapey Libre+Baskerville Taviraj Alegreya Allura Alegreya+Sans Lato Poppins Noto+Serif EB+Garamond";

    function getGoogleFonts(list){
        let fontFamiliesURL = ["https://fonts.googleapis.com/css2?"];
        for (let entry of list){
            fontFamiliesURL.push(`&family=${entry}`);
        }
        fontFamiliesURL.push("&display=swap")
        return fontFamiliesURL.join("");
    }

    const googleFontHref = getGoogleFonts(fontFamilies.split(" "));
    cc(googleFontHref)
    return (
        <Head>
            <title>{businessName}</title>
            <meta name={"description"} content={content && content} />
            {linkRel}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"}/>
            <link href={googleFontHref} rel="stylesheet"/>
        </Head>
    );
}
