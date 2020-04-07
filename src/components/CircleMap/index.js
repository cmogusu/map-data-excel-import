import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'
import mapStyles from './mapStyles'

const circleOptions = {
  strokeColor: 'rgb(240, 0, 0)',
  strokeOpacity: 0.1,
  strokeWeight: 2,
  fillColor: 'rgb(230, 0, 0)',
  fillOpacity: 0.5,
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
    isGoogleLoaded: false,
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

  setGoogleLoaded() {
    if (this._isMounted) this.setState({ isGoogleLoaded: true })
  }

  setMapBounds() {
    this._map.fitBounds(southAfricaBounds)
  }

  handleOnLoad = map => {
    this._map = map
    this.setMapBounds()
    this.setGoogleLoaded()
    console.log(window.google)
  }

  handleZoomChanged = () => {
    if (this._map) {
      const zoom = this._map.getZoom()
      this.setZoom(zoom)
    }
  }

  render() {
    const { height, isGoogleLoaded } = this.state
    const { totalInfectedByTown } = this.props
    // const totalInfectedByTown = this.props.totalInfectedByTown.slice(0, 10)

    return (
      <section className="border bg-dark h-100" ref={this.containerRef}>
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          {height > 0 && (
            <GoogleMap
              center={center}
              id="map"
              mapContainerStyle={{ width: '100%', height: `${height}px` }}
              options={mapOptions}
              zoom={14}
              onLoad={this.handleOnLoad}
              onZoomChanged={this.handleZoomChanged}
            >
              {isGoogleLoaded && totalInfectedByTown.map(({ town, lat, lng, totalInfected }) => (
                <Marker
                  animation="DROP"
                  position={{ lat, lng }}
                  key={camelCase(town)}
                  icon={{
                    ...circleOptions,
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: totalInfected/4e3,
                  }}
                  title={town}
                />
              ))}
            </GoogleMap>
          )}
        </LoadScript>
      </section>
    )
  }
}

GMaps.propTypes = {
  totalInfectedByTown: PropTypes.array.isRequired
}

export default GMaps
