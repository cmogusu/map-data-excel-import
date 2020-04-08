import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import map from 'lodash/map'
import first from 'lodash/first'
import camelCase from 'lodash/camelCase'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'


class MultiplePointsPerMarker extends Component {
  _isMounted = true

  markers = {}

  state = {
    activeMarkerKey: '',
  }

  componentDidMount() {
    setTimeout(() => {
      this.forceUpdate()
    }, 5000)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleMarkerClick = key => () => {
    if (this._isMounted) this.setState({ activeMarkerKey: key })
  }

  handleOnMarkerLoad = key => marker => {
    this.markers[key] = marker
  }

  renderInfoWindow = locationArray =>
    <div>
      {locationArray.map((location, index) => (
        <dl key={`${camelCase(location['Address'])}`}>
          {map(location, (val, key) => (
            <Fragment key={`${index}-${key}`}>
              <dt>{key}</dt>
              <dd>{val.toString()}</dd>
            </Fragment>
          ))}
        </dl>
      ))}
    </div>

  render() {
    const { activeMarkerKey } = this.state
    const data = this.props.data.slice(1)
    const firstEl = get(data, '[0][0]', {})
    const { Latitude, Longitude } = firstEl

    if (!Latitude || !Longitude) {
      return <div className="gmaps border bg-light h-100" />
    }

    return (
      <div className="gmaps border bg-light h-100">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={{ lat: Latitude, lng: Longitude }}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={4}
          >
            {data.map(locationArray => {
              const { Address, Latitude: lat, Longitude: lng } = first(locationArray) || {}
              const key = camelCase(Address)
              return (
                <Fragment key={key}>
                  <Marker
                    animation="DROP"
                    data-key={key}
                    position={{ lat, lng }}
                    onClick={this.handleMarkerClick(key)}
                    onLoad={this.handleOnMarkerLoad(key)}
                    // clusterer={clusterer}
                  />
                  {key === activeMarkerKey && !!this.markers[key] && (
                    <InfoWindow anchor={this.markers[key]}>
                      {this.renderInfoWindow(locationArray)}
                    </InfoWindow>
                  )}
                </Fragment>
              )
            })}
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

MultiplePointsPerMarker.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        'Address': PropTypes.string,
        'Status': PropTypes.bool,
        'Cont. Invoice Total': PropTypes.number,
        'Client Invoice Total': PropTypes.number,
        'WO #': PropTypes.string,
        'Loan #': PropTypes.string,
        'Date Receieved': PropTypes.string,
        'Date Due': PropTypes.string,
        'Client': PropTypes.string,
        'County': PropTypes.string,
        'Work Type': PropTypes.string,
        'Contractor': PropTypes.string,
        'Admin': PropTypes.string,
        'Photos': PropTypes.number,
        'Latitude': PropTypes.number,
        'Longitude': PropTypes.number,
      }),
    ),
  ).isRequired
}

export default MultiplePointsPerMarker
