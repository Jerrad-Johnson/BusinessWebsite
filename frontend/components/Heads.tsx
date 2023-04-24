import Head from "next/head";
import {businessName, cc} from "../common/variables";
import {GenericHeadAttributes} from "../types/layout";

const linkRel = ( <link rel="icon" href="/favicon.ico" /> );

export function GenericHead({metaName, content}: GenericHeadAttributes){ // TODO Update all pages to use this format; param. metaName is no longer used.

    return (
        <Head>
            <title>{businessName}</title>
            <meta name={"description"} content={content && content} />
            {linkRel}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Arapey&display=swap" rel="stylesheet"/>
        </Head>
    );
}
