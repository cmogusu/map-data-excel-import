import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'
import './style.css'

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  visible: true,
}

class GMaps extends Component {
  circle = null

  handleDrag = event => {
    console.log('*****', event)
  }

  handleDragStart = event => {
    console.log('######', event.latLng.lat(), event.latLng.lng())
  }

  handleDragEnd = () => {
    const bounds = this.circle.getBounds()
    const center = this.circle.getCenter()
    console.log('$$$$$$', bounds.toJSON(), center.toJSON())
  }

  handleLoad = circle => {
    this.circle = circle
  }

  handleRadiusChanged = () => {
    console.log('radius changed')
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
            zoom={18}
          >
            <Circle
              center={{ lat, lng }}
              draggable
              radius={30}
              options={options}
              // onDrag={this.handleDrag}
              onDragEnd={this.handleDragEnd}
              // onDragStart={this.handleDragStart}
              onLoad={this.handleLoad}
              onRadiusChanged={this.handleRadiusChanged}
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
