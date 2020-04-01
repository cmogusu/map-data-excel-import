import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'
import { getBounds } from '../../services/common'
import './style.css'

class GMaps extends Component {
  map = null

  poly = null

  handleMapLoaded = map => {
    this.map = map
    this.fitToBounds()
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
    const coords = path
      .getArray()
      .map(latLng => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }))
    console.log(coords)
  }

  render() {
    const data = this.props.data.slice(1)
    const [, , lat, lng] = data[0]
    const path = data.map(([, , lat, lng]) => ({ lat, lng }))

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
            onLoad={this.handleMapLoaded}
          >
            <Polygon
              draggable
              editable
              path={path}
              strokeColor="#00ff00"
              strokeOpacity={0.5}
              strokeWeight={2}
              onMouseUp={this.handleDragEnd}
              onLoad={this.handlePolyLoaded}
            />
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
