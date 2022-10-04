import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const LeafletMap = () => {
    return (
        <MapContainer center={[40.8054,-74.0241]} zoom={14} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
            <TileLayer
                url={`https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}`}
                attribution={'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'}
                maxZoom={16}
            />
            <Marker
                position={[40.8054,-74.0241]}
                draggable={true}
                animate={true}
            >
                <Popup>
                    Hey ! you found me
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default LeafletMap;