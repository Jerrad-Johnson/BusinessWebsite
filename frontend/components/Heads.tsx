import Head from "next/head";
import {businessName} from "../common/variables";

const Heads = {
    GalleryHead: (
        <Head>
            <title>{businessName}</title>
            <meta name="Image Galleries" content="Stuff" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default Heads;