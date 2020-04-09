import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { bearing, point } from '@turf/turf';
import * as t from '@turf/turf';
import first from 'lodash/first'
import last from 'lodash/last'
import { GoogleMap, LoadScript, StreetViewPanorama } from '@react-google-maps/api'
import { Slider } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'

window.t = t

/*
const pos = [
  {lat: 40.66398294552678, lng: -73.95027705637932},
  {lat: 40.66394021946247, lng: -73.95107769577027},
  {lat: 40.66389342421777, lng: -73.9518944284153},
  {lat: 40.663808989236664, lng: -73.9532636961174},
]
*/
const pos = [
  [-73.94868516532898, 40.66402872342245],
  [-73.95274602977753, 40.663804920078235],
]
/*
const pos = [
  [40.66392960919134, -73.95074991119648],
  [40.66390568605183, -73.95087717751467],
]
*/

class GMaps extends Component {
  streetPanaroma = null

  state = {
    isZoomRunning: false,
    isPanoRunning: false,
    zoomSpeed: 0.01,
  }

  handleOnLoad = streetPanaroma => {
    this.streetPanaroma = streetPanaroma
    window.s = streetPanaroma
    console.log(streetPanaroma)
  }

  componentDidMount() {
    this.getBearing()
  }

  getBearing() {
    const firstPoint = t.point(first(pos))
    const lastPoint = t.point(last(pos))
    const angle = t.bearing(firstPoint, lastPoint)
    const negAngle = t.bearing(lastPoint, firstPoint)
    const distance = t.distance(firstPoint, lastPoint)
    console.log('***', angle, negAngle, distance)
  }

  handlePovChanged = () => {
    const { zoom } = this.streetPanaroma.getPov()
    console.log(zoom)
  }

  handleZoomChange = () => {
    console.log(this.streetPanaroma.getZoom())
  }

  runZoom = () => {
    const { zoomSpeed, isZoomRunning } = this.state
    if (!isZoomRunning) return

    const zoom = this.streetPanaroma.getZoom()
    const newZoom = zoom > 3.2 ? 0.01 : zoom + zoomSpeed

    this.streetPanaroma.setZoom(newZoom)
    window.requestAnimationFrame(this.runZoom)
  }

  handleMapClick = event => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    console.log({ lat, lng })
  }

  handleStartZoom = () => {
    if (this.state.isPanoRunning) return

    this.streetPanaroma.setPov({ heading: 266, pitch: 0 })
    this.setState({ isZoomRunning: true }, this.runZoom)
  }


  handleStartPano = () => {
    if (this.state.isPanoRunning) return
    this.setState({ isPanoRunning: true }, this.runPano)
  }

  handleStopPano = () => {
    this.setState({ isPanoRunning: false })
  }

  runPano = () => {
    if (!this.state.isPanoRunning) return

    const { heading, pitch } = this.streetPanaroma.getPov()
    this.streetPanaroma.setPov({ heading: heading + 0.2, pitch })

    window.requestAnimationFrame(this.runPano)
  }

  handleStopZoom = zoomSpeed => {
    this.setState({ isZoomRunning: false })
  }

  handleZoomSpeedChange = zoomSpeed => {
    this.setState({ zoomSpeed })
  }

  render() {
    const data = this.props.data.slice(1)
    const [, , lat, lng] = data[0]
    const { zoomSpeed } = this.state

    return (
      <div className="gmaps">

        <button onClick={this.handleStartZoom}>Start zoom</button>&nbsp;
        <button onClick={this.handleStopZoom}>Stop zoom</button>&nbsp;
        <br/>
          <div>
            <span>Zooming speed</span>
            <Slider
              min={0.001}
              max={0.1}
              step={0.001}
              value={zoomSpeed}
              onChange={this.handleZoomSpeedChange}
            />
          </div>

        <br />

        <button onClick={this.handleStartPano}>Start pano</button>
        <button onClick={this.handleStopPano}>Stop pano</button>
        <br />

        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={{ lat, lng }}
            id="map"
            mapContainerStyle={{ width: '2000px', height: '850px' }}
            zoom={18}
            onClick={this.handleMapClick}
          >
            <StreetViewPanorama
              options={{
                addressControl: false,
                disableDoubleClickZoom: true,
                enableCloseButton: false,
                fullscreenControl: true,
                linksControl: false,
                panControl: false,
                scrollWheel: false,
                zoomControl: false,
              }}
              position={{ lat, lng }}
              visible
              onLoad={this.handleOnLoad}
              // onPovChanged={this.handlePovChanged}
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
