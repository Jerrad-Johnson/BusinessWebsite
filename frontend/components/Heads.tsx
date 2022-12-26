import Head from "next/head";
import {businessName} from "../common/variables";

const linkRel = ( <link rel="icon" href="/favicon.ico" /> );

export function GenericHead({metaName, content}){

    return (
        <Head>
            <title>{businessName}</title>
            <meta name={metaName} content={content} />
            {linkRel}
        </Head>
    );
}
