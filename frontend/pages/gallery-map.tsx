import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from "next/dynamic";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import httpClient from "../common/httpClient";
import {cc} from "../common/variables";

function GalleryMap<NextPage>(){

    const [leafletData, setLeafletData] = useState({});

    useEffect(() => {
        getLeafletData(setLeafletData)
    }, []);

    const MapWithNoSSR = dynamic(() => import("../components/LeafletMap"), {
        ssr: false,
    });

    return (
        <div className={"container"}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={""}>
                <button onClick={(e) => {
                    dataLog(leafletData);
                }}>Log</button>
                <div id={"map"} className={"height: 100px;"}>
                    <MapWithNoSSR />
                </div>
            </main>

            <footer className={""}>
            </footer>
        </div>
    )
}

async function getLeafletData(setLeafletData: Dispatch<SetStateAction<object>>): Promise<void>{
    const results = await httpClient.get(`${process.env.SERVERURL}/leaflet/getImagePaths`);
    setLeafletData(results.data.data);
}



function dataLog(leafletData){
    cc(leafletData);
}

export default GalleryMap;
