import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
  };

const center = {
  lat: -3.745,
  lng: -38.523
};


function DetailsMap() {
  return (
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
  )
}

export default DetailsMap