import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from "./react-leaflet-clustermarker_v2";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import httpClient from "../common/httpClient";
import {LatLngExpression} from "leaflet";
import {mapDefaultLocation} from "../common/variables";
import Image from "next/image";
const cc = console.log;


const LeafletMap = () => {
    const [leafletData, setLeafletData] = useState([]);

    useEffect(() => {
        getLeafletData(setLeafletData);
    }, []);

    const leafletMarkers = leafletData.map(({file_name_full, latitude, longitude, url, height, width}) => {
       let lat: number = +latitude;
       let lon: number = +longitude;
       let lat_lon: LatLngExpression = [lat, lon];

       return (
           <Marker key={file_name_full}
               position={lat_lon}
               draggable={true}
               /*animate={true}*/
               >

               <Popup>
                   <Image src={url} height={height} width={width}/>
                   {file_name_full}
               </Popup>
           </Marker>
       );
    });

    return (
        <MapContainer center={mapDefaultLocation} zoom={14} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
            <TileLayer
                url={`https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}`}
                attribution={'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'}
                maxZoom={16}
            />
            <MarkerClusterGroup>
                {leafletMarkers}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

async function getLeafletData(setLeafletData: Dispatch<SetStateAction<object>>): Promise<void>{
    const results = await httpClient.get(`${process.env.SERVERURL}/leaflet/getImagePaths`);
    setLeafletData(results.data.data);
}

export default LeafletMap;