import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'
import './style.css'

const getBounds = data => {
  let minLat = Number.MAX_SAFE_INTEGER
  let maxLat = - Number.MAX_SAFE_INTEGER
  let minLng = Number.MAX_SAFE_INTEGER
  let maxLng = - Number.MAX_SAFE_INTEGER
  data.forEach(([, , lat, lng]) => {
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
  })
  /*
  return [
    { lat: minLat, lng: minLng },
    { lat: maxLat, lng: maxLng },
  ]
  */
  return {
    east: maxLng,
    north: maxLat,
    south: minLat,
    west: minLng,
  }
}

class GMaps extends Component {
  handleOnLoad = map => {
    const data = this.props.data.slice(1)
    const bounds = getBounds(data)
    map.fitBounds(bounds)
  }

  render() {
    const data = this.props.data.slice(1)
    const [, , lat, lng] = data[0]

    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={{ lat, lng }}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={10}
            onLoad={this.handleOnLoad}
          >
            {data.map(([name, type, lat, lng]) => (
              <Marker
                key={name}

                title={name}
                position={{ lat, lng }}
              />
            ))}
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
