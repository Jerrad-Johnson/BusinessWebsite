import Head from "next/head";
import {businessName} from "../common/variables";
import fjGallery from "flickr-justified-gallery";

const linkRel = ( <link rel="icon" href="/favicon.ico" /> );
cc(fjGallery)

export function GenericHead({metaName, content}){
    return (
        <Head>
            <title>{businessName}</title>
            <meta name={metaName} content={content} />
            {linkRel}
        </Head>
    );
}
