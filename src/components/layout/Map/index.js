import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const Map = withScriptjs(
  withGoogleMap(props => {
    const coordinates = { lat: props.lat, lng: props.lng }
    return (
      <GoogleMap defaultZoom={8} defaultCenter={coordinates}>
        <Marker position={coordinates} />
      </GoogleMap>
    )
  })
)

export default Map
