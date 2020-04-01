import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, LoadScript, Circle, InfoBox, Marker } from '@react-google-maps/api'
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
  map = null

  circle = null

  infoBox = null

  marker = null

  state = {
    isMapLoaded: false,
  }

  handleDragEnd = () => {
    const bounds = this.circle.getBounds()
    const center = this.circle.getCenter()
    console.log('$$$$$$', bounds.toJSON(), center.toJSON())
  }

  handleMapLoaded = map => {
    this.map = map
    this.setState({ isMapLoaded: true })
  }

  handleCircleLoaded = circle => {
    this.circle = circle
  }

  handleInfoboxLoaded = infoBox => {
    this.infoBox = infoBox
  }

  handleMarkerLoaded = marker => {
    this.marker = marker
    this.forceUpdate()
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
            onLoad={this.handleMapLoaded}
          >
            <Circle
              center={{ lat, lng }}
              draggable
              radius={30}
              options={options}
              onDragEnd={this.handleDragEnd}
              onLoad={this.handleCircleLoaded}
              onRadiusChanged={this.handleRadiusChanged}
            />
            {!!this.marker && (
              <InfoBox
                anchor={this.marker}
                position={{ lat, lng }}
                onLoad={this.handleInfoboxLoaded}
              >
                <div className="info-box">
                  Hello world
                </div>
              </InfoBox>
            )}
            {this.state.isMapLoaded && (
              <Marker
                position={{ lat, lng }}
                options={{
                  anchorPoint: { x: 80, y: 80 },
                }}
                onLoad={this.handleMarkerLoaded}
                icon={{
                  url: 'http://localhost:3000/logo1.png',
                }}
              />
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
