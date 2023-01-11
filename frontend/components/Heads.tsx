import Head from "next/head";
import {businessName} from "../common/variables";
import {GenericHeadAttributes} from "../types/layout";

const linkRel = ( <link rel="icon" href="/favicon.ico" /> );

export function GenericHead({metaName, content}: GenericHeadAttributes){

    return (
        <Head>
            <title>{businessName}</title>
            <meta name={metaName && metaName} content={content && metaName} />
            {linkRel}
        </Head>
    );
}
