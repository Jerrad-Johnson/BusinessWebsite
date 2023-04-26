import Head from "next/head";
import {businessName, cc} from "../common/variables";
import {GenericHeadAttributes} from "../types/layout";

const linkRel = ( <link rel="icon" href="/favicon.ico" /> );

export function GenericHead({metaName, content}: GenericHeadAttributes){ // TODO Update all pages to use this format; param. metaName is no longer used.

    let fontFamilies = "Arapey Libre+Baskerville Taviraj Alegreya:wght@500;600;700 Allura Alegreya+Sans:wght@400;600 Lato Poppins Noto+Serif EB+Garamond";
    function getGoogleFonts(list: string[]){
        let fontFamiliesURL = ["https://fonts.googleapis.com/css2?"];
        for (let entry of list){
            fontFamiliesURL.push(`&family=${entry}`);
        }
        fontFamiliesURL.push("&display=swap")
        return fontFamiliesURL.join("");
    }
    const googleFontHref = getGoogleFonts(fontFamilies.split(" "));

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
