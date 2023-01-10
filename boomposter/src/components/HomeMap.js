import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
  };

const center = {
  lat: -3.745,
  lng: -38.523
};

export default function HomeMap() {
  return (
    <div className="rounded-[6px] overflow-hidden w-[311px] h-[385px] lg:w-[1120px] lg:h-[576px] my-[25px]">
    <LoadScript
        googleMapsApiKey="YOUR_API_KEY"
      >
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      </LoadScript>
      </div>
  )
}
