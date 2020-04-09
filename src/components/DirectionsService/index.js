import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'

const pos = [
  {"lat":40.66392960919134,"lng":-73.95074991119648},
  {lat: 40.67199129040299, lng: -73.96870888016483},
]

class GMaps extends Component {
  map = null

  ds = null

  state = {
    isGoogleLoaded: false,
    directionsResult: null,
  }

  handleMapLoaded = map => {
    this.map = map
    this.setState({ isGoogleLoaded: true })
  }

  handleOnDServiceLoad = ds => {
    this.ds = ds
    window.ds = ds
    console.log(ds)
  }

  handleCallback = (results, status) => {
    console.log(results, status)
    if (!this.state.directionsResult) this.setState({ directionsResult: results })
  }

  render() {
    const { directionsResult, isGoogleLoaded } = this.state
    const data = this.props.data.slice(1)
    const [, , lat, lng] = data[0]

    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
          libraries={['drawing']}
        >
          <GoogleMap
            center={{ lat, lng }}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={18}
            onClick={this.handleMapClick}
            onLoad={this.handleMapLoaded}
          >
            {isGoogleLoaded && (
              <DirectionsService
                options={{
                  origin: pos[0],
                  destination: pos[1],
                  travelMode: window.google.maps.TravelMode.BICYCLING,
                }}
                callback={this.handleCallback}
                onLoad={this.handleOnDServiceLoad}
              />
            )}
            {directionsResult && (
              <DirectionsRenderer directions={directionsResult} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

GMaps.propTypes = {
  data: PropTypes.array.isRequired
}

export default GMaps
