import Head from "next/head";
import {businessName} from "../common/variables";

const linkRel = ( <link rel="icon" href="/favicon.ico" /> );

const Heads = {
    GalleryHead: (
        <Head>
            <title>{businessName}</title>
            <meta name="Image Galleries" content="Stuff" />
            {linkRel}
        </Head>
    )
}

export default Heads;