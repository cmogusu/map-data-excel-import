import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import xlsx from 'xlsx'
import './style.css'

const { Dragger } = Upload

const splitLetterAndNumber = string => {
  const [letter] = string.match(/[a-zA-Z]+/)
  const [number] = string.match(/[0-9]+/)
  return [letter.charCodeAt(), parseInt(number, 10)]
}

const getDataFromSheet = sheet => {
  const [startCell, endCell] = sheet['!ref'].split(':')
  const [startCol, startRow] = splitLetterAndNumber(startCell)
  const [endCol, endRow] = splitLetterAndNumber(endCell)
  const arr = []

  for(let row = startRow; row <= endRow; row += 1) {
    arr[row - startRow] = []
    for(let col = startCol; col <= endCol; col += 1) {
      const cellRef = `${String.fromCharCode(col)}${row}`
      arr[row - startRow][col - startCol] = sheet[cellRef].v
    }
  }
  return arr
}

class ImportData extends Component {
  files = []

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
    const data = getDataFromSheet(sheets.Sheet1)
    this.uploadData(data)
  }

  handleBeforeUpload = file => {
    if (file) {
      this.files = [file]
      this.parseFileAndUploadData(file);
    }
    return false
  }

  render() {
    return (
      <div className="container">
        <Dragger
          accept=".xlsx, xlsm, .xml"
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
  }
}

ImportData.propTypes = {
  setData: PropTypes.func.isRequired,
}

export default ImportData
