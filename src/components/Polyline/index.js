import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flatten from 'lodash/flatten'
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api'
import { LoadingOutlined } from '@ant-design/icons'
import { GOOGLE_MAPS_API } from '../../constants/common'
import { getBounds } from '../../services/common'
import './style.css'

const d = [[{"lat":45.4633953807687,"lng":-73.67643770776596,"panoId":"XEGdDE-9LuttFAfxDRAhiQ"},{"lat":45.4633528349288,"lng":-73.67632493439405,"panoId":"sNuiRgd7Mf7V7BY1U7QmDw"},{"lat":45.4633113450296,"lng":-73.67621496037977,"panoId":"KMd05H5DZ4XC2QTq5NaVsA"},{"lat":45.46326958208505,"lng":-73.67610426307161,"panoId":"y3zvP_VbEKoHw0CTaKfHnQ"},{"lat":45.46326958208505,"lng":-73.67610426307161,"panoId":"y3zvP_VbEKoHw0CTaKfHnQ"},{"lat":45.46322652190965,"lng":-73.67599012777784,"panoId":"W3W7ic6z-Q_Eo8wTUSMY1g"},{"lat":45.46318360187527,"lng":-73.6758763644152,"panoId":"eqdFJG60XnrqTVa4SQ_3eA"},{"lat":45.46314162068204,"lng":-73.67576508999159,"panoId":"hm6jETOX9XMaqNZlh6hcWg"},{"lat":45.46310014933822,"lng":-73.67565516740741,"panoId":"OyZAWt8IophbWlV6s-3V8Q"},{"lat":45.46310014933822,"lng":-73.67565516740741,"panoId":"OyZAWt8IophbWlV6s-3V8Q"},{"lat":45.4630588751531,"lng":-73.67554576784362,"panoId":"k58EcPmkQOgFiEgCUCWkGA"},{"lat":45.46301763551807,"lng":-73.67543646029328,"panoId":"riXO0GJIFKLV7WKYr8bcdQ"},{"lat":45.46297660073016,"lng":-73.67532769613263,"panoId":"0zXhV2lRxqrO8nVjinnv3w"},{"lat":45.46293590376014,"lng":-73.67521982779687,"panoId":"ldgwDVmhQqAYmmRI430hBg"},{"lat":45.46289649604621,"lng":-73.67511537707145,"panoId":"GTncVcOToFG6Jf2Z-Bb_lw"},{"lat":45.46289649604621,"lng":-73.67511537707145,"panoId":"GTncVcOToFG6Jf2Z-Bb_lw"},{"lat":45.46285915566024,"lng":-73.67501640619673,"panoId":"IWTpRCFaxGVrfJbHPD7UFw"},{"lat":45.46280633171219,"lng":-73.67487639667623,"panoId":"JDSK-ppJoq7BsLABB-KTZQ"}],[{"lat":45.46284045142258,"lng":-73.67483149932808,"panoId":"3O0BHoYVL2yEaeguL_dffA"},{"lat":45.46295910569032,"lng":-73.67473999731227,"panoId":"vbu2zdue1qvEAjMLB0GAAQ"},{"lat":45.46295910569032,"lng":-73.67473999731227,"panoId":"vbu2zdue1qvEAjMLB0GAAQ"},{"lat":45.46303820853547,"lng":-73.6746789959684,"panoId":"D020Ruiadf-V1tskxlvpDw"},{"lat":45.46311731138063,"lng":-73.67461799462454,"panoId":"_z4XztFsj4hAVdD3FwBcOQ"},{"lat":45.46319641422578,"lng":-73.67455699328066,"panoId":"N7kvCmrN3LEy3Lq-_VZkqg"},{"lat":45.46327551707094,"lng":-73.6744959919368,"panoId":"TD3kxtFiTT5PAPDYkYq2Fg"},{"lat":45.46327551707094,"lng":-73.6744959919368,"panoId":"TD3kxtFiTT5PAPDYkYq2Fg"},{"lat":45.4633537,"lng":-73.6744357,"panoId":"YlqYwtWF6iGIbaH3EE5ciA"},{"lat":45.46340164773712,"lng":-73.67440041011582,"panoId":"UMB9_GMTEjTGokPfnzojeg"},{"lat":45.46348156063234,"lng":-73.67434159364217,"panoId":"VJWmdUFD97OmoUgqCabCxw"},{"lat":45.46356147352755,"lng":-73.67428277716851,"panoId":"o1JKQh1PhUmagFxqTQMhMw"},{"lat":45.46364138642276,"lng":-73.67422396069486,"panoId":"DMXXLinUUxbRQOX8cZhF3Q"},{"lat":45.46372129931797,"lng":-73.6741651442212,"panoId":"yQg3tFLcVPdP-gqtrQ1CTQ"},{"lat":45.46372129931797,"lng":-73.6741651442212,"panoId":"yQg3tFLcVPdP-gqtrQ1CTQ"},{"lat":45.46381719479223,"lng":-73.67409456445283,"panoId":"TAsgxgee_jcvdxS05fF9xQ"},{"lat":45.4639022,"lng":-73.674032,"panoId":"e-wNOisSNzmfHatUFb_k-Q"}],[{"lat":45.46387643305845,"lng":-73.67396440349074,"panoId":"dC-sLkphJkpy0o0yghCAUw"},{"lat":45.46382489917534,"lng":-73.67382921047225,"panoId":"JRQOCts26dpzaYnRQt4xIw"},{"lat":45.46377336529225,"lng":-73.67369401745376,"panoId":"q7Qd4fAM3O2uXS6xTnkiyQ"},{"lat":45.4637261258994,"lng":-73.67357009052012,"panoId":"Sp8oyR9sVQkEvXVQGhNGFQ"},{"lat":45.46368318099682,"lng":-73.67345742967137,"panoId":"tYytBJoVi937ZCV2MrsMPQ"}]]

const p = flatten(d).map(({ lat, lng }) => ({ lat, lng }))

class GMaps extends Component {
  map = null

  poly = null

  handleMapLoaded = map => {
    this.map = map
    // this.fitToBounds()
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
    // const path = data.map(([, , lat, lng]) => ({ lat, lng }))

    return (
      <div className="gmaps">
        <LoadScript
          id="script-loader"
          googleMapsApiKey={GOOGLE_MAPS_API}
          loadingElement={<LoadingOutlined />}
        >
          <GoogleMap
            center={p[0]}
            id="map"
            mapContainerStyle={{ width: '800px', height: '450px' }}
            zoom={16}
            onLoad={this.handleMapLoaded}
          >
            <Polyline
              draggable
              editable
              path={p}
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
