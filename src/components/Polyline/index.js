import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, Polyline, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'
import { getBounds } from '../../services/common'
import data1 from './data1'
import data2 from './data2'
import './style.css'

const p1 = data1.map(({ lat, lng }) => ({ lat, lng }))

const p2 = data2.map(({ lat, lng }) => ({ lat, lng }))

class GMaps extends Component {
  map = null

  poly = null

  state = {
    directionsResult: null,
    isGoogleLoaded: false,
  }

  handleMapLoaded = map => {
    this.map = map
    this.setState({ isGoogleLoaded: true })
  }

  handlePolyLoaded = poly => {
    this.poly = poly
  }

  fitToBounds = () => {
    const data = this.props.data.slice(1)
    const bounds = getBounds(data)
    this.map.fitBounds(bounds)
  }

  handleDragEnd = () => {
    const path = this.poly.getPath()
    const coords = path.getArray().map(latLng => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }))
    console.log(coords)
  }

  handleOnDServiceLoad = ds => {
    this.ds = ds
    window.ds = ds
  }

  handleCallback = (results, status) => {
    if (!this.state.directionsResult)
      this.setState({ directionsResult: results })
  }

  render() {
    const { directionsResult, isGoogleLoaded } = this.state

    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={p1[0]}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={20}
            onLoad={this.handleMapLoaded}
          >
            <Polyline
              draggable
              editable
              path={p1}
              strokeColor="#00ff00"
              strokeOpacity={0.5}
              strokeWeight={1}
              onMouseUp={this.handleDragEnd}
              onLoad={this.handlePolyLoaded}
            />
            <Polyline
              draggable
              editable
              path={p2}
              options={{
                strokeColor: '#ff0000',
                strokeOpacity: 0.5,
                strokeWeight: 1,
              }}
              onMouseUp={this.handleDragEnd}
              onLoad={this.handlePolyLoaded}
            />
            {true && isGoogleLoaded && (
              <DirectionsService
                options={{
                  origin: p1[0],
                  destination: p1[p1.length - 1],
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
  data: PropTypes.array.isRequired,
}

export default GMaps
