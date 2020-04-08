import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Upload, Modal } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import xlsx from 'xlsx'

const { Dragger } = Upload

const splitLetterAndNumber = string => {
  const [letter] = string.match(/[a-zA-Z]+/)
  const [number] = string.match(/[0-9]+/)
  return [letter.charCodeAt(), parseInt(number, 10)]
}

const getDataFromSheet = sheet => {
  const ref = get(sheet, '!ref', '*****')
  console.log(ref)
  if (1) return ''
  const [startCell, endCell] = ref.split(':')
  const [startCol, startRow] = splitLetterAndNumber(startCell)
  const [endCol, endRow] = splitLetterAndNumber(endCell)
  const arr = []

  for(let row = startRow; row <= endRow; row += 1) {
    arr[row - startRow] = []
    for(let col = startCol; col <= endCol; col += 1) {
      const cellRef = `${String.fromCharCode(col)}${row}`
      const value = sheet[cellRef] ? sheet[cellRef].v : ''
      arr[row - startRow][col - startCol] = value
    }
  }
  return arr
}

class ImportData extends Component {
  files = []

  _isMounted = true

  state = {
    isModalVisible: false
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  uploadData = data => {
    if (data && data.length) {
      this.props.setData(data);
    }
  }

  readFileData = file =>
    new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = function(event) {
        const fileData = new Uint8Array(event.target.result);
        const { Sheets } = xlsx.read(fileData, {type: 'array'});
        resolve(Sheets)
      }
      reader.readAsArrayBuffer(file)
    })

  parseFileAndUploadData = async file => {
    const sheets = await this.readFileData(file)
    const sheetKeys = Object.keys(sheets)
    const sheet = get(sheets, sheetKeys[0])
    if (sheet) {
      const data = xlsx.utils.sheet_to_json(sheet)
      this.uploadData(data)  
    }
  }

  handleBeforeUpload = file => {
    if (file) {
      this.files = [file]
      this.parseFileAndUploadData(file);
      this.hideModal()
    }
    return false
  }

  showModal = () => {
    if (this._isMounted) this.setState({ isModalVisible: true })
  }

  hideModal = () => {
    if (this._isMounted) this.setState({ isModalVisible: false })
  }

  renderModalContent = () => (
    <div className="text-center">
      <p>
        Please import an excel file contain the google map data.
        <br />
        <a href={this.props.sampleFile} target="_blank">
          Here is a sample file
        </a> that you may use it import data
      </p>

      <Dragger
        accept=".xls, .xlsx, xlsm, .xml"
        beforeUpload={this.handleBeforeUpload}
        fileList={this.files}
        name="file"
        multiple={false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
    </div>
  )

  render() {
    const { isModalVisible } = this.state
    const { hasData } = this.props

    return (
      <section className="mb-2 border p-2 d-flex justify-content-center align-items-center flex-column mb-2 bg-light text-center">
        <h3 className="h5">Upload file</h3>
        <p>Upload a file containing the map data</p>
        <button className={`btn ${hasData ? 'btn-outline-secondary' : 'btn-primary'}`} type="button" onClick={this.showModal}>
          Upload file
        </button>
        <Modal
          wrapClassName="download-cta-modal"
          footer={null}
          visible={isModalVisible}
          onCancel={this.hideModal}
        >
          {this.renderModalContent()}
        </Modal>
      </section>
    )
  }
}

ImportData.propTypes = {
  hasData: PropTypes.bool.isRequired,
  sampleFile: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
}

export default ImportData
