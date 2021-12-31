import React from 'react';
import Papa from 'papaparse';

class FileReader extends React.Component {
    constructor() {
      super();
      this.state = {
        csvfile: undefined
      };
      this.updateData = this.updateData.bind(this);
    }
  
    handleChange = event => {
      this.setState({
        csvfile: event.target.files[0]
      });
    };
  
    importCSV = () => {
      const {csvfile } = this.state;
      if (csvfile !== undefined) {
        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
      } else {
          console.log('Error: No file uploaded')
      }
    };
  
    updateData(result) {
      var data = result.data;
      const {
          setCsvJsonData
      } = this.props;
      setCsvJsonData(data)
    }
  
    render() {
      return (
        <div className={this.props.className}>
          <h5>Upload Customer Data</h5>
          CSV File:<input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          Notes: <input type='text' onChange={this.handleNotes} /><p />
          <button onClick={this.importCSV}> Upload File!</button>
        </div>
      );
    }
  }
  
  export default FileReader;