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
        </Head>
    );
}
