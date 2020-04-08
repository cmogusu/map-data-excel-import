import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bearing, point } from '@turf/turf';
import first from 'lodash/first'
import last from 'lodash/last'
import { GoogleMap, LoadScript, StreetViewPanorama } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'

/*
const pos = [
  {lat: 40.66398294552678, lng: -73.95027705637932},
  {lat: 40.66394021946247, lng: -73.95107769577027},
  {lat: 40.66389342421777, lng: -73.9518944284153},
  {lat: 40.663808989236664, lng: -73.9532636961174},
]
*/
const pos = [
  [40.66398294552678, -73.95027705637932],
  [40.66394021946247, -73.95107769577027],
  [40.66389342421777, -73.9518944284153],
  [40.663808989236664, -73.9532636961174],
]



class GMaps extends Component {
  streetPanaroma = null

  state = {
    zoomRunning: false,
  }

  handleOnLoad = streetPanaroma => {
    this.streetPanaroma = streetPanaroma
    // this.streetPanaroma.setZoom(0.05)
    window.s = streetPanaroma
  }

  componentDidMount() {
    this.getBearing()
  }

  getBearing() {
    const firstPoint = point(first(pos))
    const lastPoint = point(last(pos))
    const angle = bearing(lastPoint, firstPoint)
    console.log('***', angle, bearing(firstPoint, lastPoint))
  }

  handlePovChanged = () => {
    // const { zoom } = this.streetPanaroma.getPov()
    // console.log(zoom)
  }

  handleZoomChange = () => {
    console.log(this.streetPanaroma.getZoom())
  }

  runZoom = () => {
    const zoom = this.streetPanaroma.getZoom()
    this.streetPanaroma.setZoom(zoom + 0.005)

    if (zoom < 3.5) {
      window.requestAnimationFrame(this.runZoom)
    } else {
      this.loadNextPano()
    }
  }

  loadNextPano() {
    const [link] = this.streetPanaroma.getLinks();
    if (link && link.pano) {
      // this.streetPanaroma
    }
  }

  handleMapClick = event => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    console.log({ lat, lng })
  }

  handleStartZoom = () => {
    // this.setState({ zoomRunning: true }, this.runZoom)
    this.runZoom()
  }

  handleStopZoom = () => {
    this.setState({ zoomRunning: false })
  }

  render() {
    const data = this.props.data.slice(1)
    const [, , lat, lng] = data[0]

    return (
      <div className="gmaps">
        <button onClick={this.handleStartZoom}>start zoom</button>
        <button onClick={this.handleStopZoom}>stop zoom</button>
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={{ lat, lng }}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={20}
            onClick={this.handleMapClick}
          >
            <StreetViewPanorama
              options={{
                addressControl: false,
                disableDoubleClickZoom: true,
                enableCloseButton: false,
                fullscreenControl: false,
                linksControl: false,
                panControl: false,
                scrollWheel: false,
                zoomControl: false,
              }}
              position={{ lat, lng }}
              visible
              onLoad={this.handleOnLoad}
              onPovChanged={this.handlePovChanged}
              onZoomChange={this.handleZoomChange}
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
