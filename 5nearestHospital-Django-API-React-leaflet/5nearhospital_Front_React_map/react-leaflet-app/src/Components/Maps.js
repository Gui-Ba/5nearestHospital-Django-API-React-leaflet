import {React,useEffect,useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer,GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import markerHopitalPng from "./hospital.png"
import hospitals from './data/hospitals.json'
// import GeoJSONCluster from "./GeoJSONCluster";
import L from 'leaflet'
import axios from "axios";


const MyData = ({location}) => {
  console.log(location.lat)

const [Data, setData] = useState("");

 const lat=location.lat
 const lng =location.lng

  useEffect(() => {
    const get_nearest_hospital = async (lat, lng) => {
      if(lat!==undefined){
    let response = await axios.get(`http://127.0.0.1:8000/hospitals/get_nearest_hospitals/?x=${lat}&y=${lng}`)
      setData(response.data);
    console.log(response.data)
      //  console.log(Data)
    }};

    get_nearest_hospital(lat, lng)
  
  }, [lat,lng]);

  if (!Data) return null;

  console.log(Data)

  const myIcon =L.icon( {
    iconUrl: markerHopitalPng,
    iconSize: [25, 41],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0]
  })

// function pointToLayer(feature, latlng) {
//   return L.circleMarker(latlng, {
//     color: 'red',
//     fillColor: 'white',
//     fillOpacity: .8,
//     radius: 3,

//   }).bindPopup("MESSAGE") // Change marker to circle
// }

function pointToLayer(feature, latlng) {
  return L.marker(latlng, {
    icon: myIcon})
}

var customOptions = {
    'maxWidth': '400',
    'width': '200',
    'className' : 'popupCustom'
    }

function onEachFeature (feature = {}, layer) {
  const { properties = {} } = feature;
  const { name, distance } = properties;
  if ( !name ) return;

  layer.bindPopup(`<p>${name}</p><p>${distance}</p>`,customOptions);
}

  return (
  // avec fichier json local
  // <GeoJSON data={hospitals.features} pointToLayer={pointToLayer} onEachFeature={onEachFeature}/>

  //avec api gis-rest-api-with-pythoh
  <GeoJSON data={Data.features} pointToLayer={pointToLayer} onEachFeature={onEachFeature}/>
    )
};

const MyMap = ({parentToChild})=> {

        const state = {
          lat: 48.866667,
          lng: 2.333333,
          zoom: 6
        }
        const myIcon = {
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        }
      const position = [state.lat, state.lng]
    

    return(
 
      <div>

        <MapContainer center={position} zoom={state.zoom} scrollWheelZoom={false} style={{height:'600px', width:'700px'}}>
          
          <MyData location={parentToChild} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        
          {/* <Marker  position={[parentToChild.lat, parentToChild.lng]} icon={new Icon(myIcon)}>
            <Popup>
              Ma position
            </Popup>
          </Marker> */}
          
          {/* <GeoJSONCluster data={hospitals} /> */}
        </MapContainer >
         </div>
      )
    }


export default MyMap