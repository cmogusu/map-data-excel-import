import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'
import mapStyles from './mapStyles'

const circleOptions = {
  strokeColor: 'rgb(240, 0, 0)',
  strokeOpacity: 0.5,
  strokeWeight: 1,
  fillColor: 'rgb(230, 0, 0)',
  fillOpacity: 0.6,
  visible: true,
}

const center = {
  lat: -29.478095,
  lng: 24.804343,
}

const southAfricaBounds = {
  west: 16.3449768409,
  east: 32.830120477,
  south: -34.8191663551,
  north: -22.0913127581,
}

const mapOptions = {
  styles: mapStyles,
  streetViewControl: false,
  rotationControl: false,
  fullscreenControl: false,
}

class GMaps extends Component {
  containerRef = createRef()

  _isMounted = false

  _map = null

  state = {
    height: 0,
    zoom: 10,
  }

  componentDidMount() {
    this._isMounted = true
    this.setMapHeight()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  setMapHeight() {
    const { current } = this.containerRef
    if (current) {
      const height = current.offsetHeight
      this.setHeight(height)
    }
  }

  setHeight(height) {
    if (this._isMounted) this.setState({ height })
  }

  setZoom(zoom) {
    if (this._isMounted) this.setState({ zoom })
  }

  setMapBounds() {
    this._map.fitBounds(southAfricaBounds)
  }

  handleOnLoad = map => {
    this._map = map
    this.setMapBounds()
  }

  handleZoomChanged = () => {
    if (this._map) {
      const zoom = this._map.getZoom()
      this.setZoom(zoom)
    }
  }

  render() {
    const { height, zoom } = this.state
    const { totalInfectedByTown } = this.props

    return (
      <section className="border bg-light h-100" ref={this.containerRef}>
        {height > 0 && (
          <LoadScript
            id="script-loader"
            googleMapsApiKey={GOOGLE_MAPS_API}
            loadingElement={<LoadingOutlined />}
          >
            <GoogleMap
              center={center}
              id="map"
              mapContainerStyle={{ width: '100%', height: `${height}px` }}
              options={mapOptions}
              zoom={14}
              onLoad={this.handleOnLoad}
              onZoomChanged={this.handleZoomChanged}
            >
              {false && totalInfectedByTown.map(({ town, lat, lng, number }) => (
                <Circle
                  animation="DROP"
                  center={{ lat, lng }}
                  key={camelCase(town)}
                  options={circleOptions}
                  radius={number/(zoom * 30)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        )}
      </section>
    )
  }
}

GMaps.propTypes = {
  totalInfectedByTown: PropTypes.array.isRequired
}

export default GMaps
