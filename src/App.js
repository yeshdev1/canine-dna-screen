import './App.css';
import { Navbar,Container,Button } from 'react-bootstrap';
import Table from './Table';
import { useEffect, useState } from 'react';
import FileReader from './FileReader';
import marker_results from './out.json';
import results from './marker-results.json';
import { keyToNameMapping, mergeTables } from './keyToName';
import Info from './Info';

function App() {
  const [matrix_cols, setMatrixCols] = useState([]);
  const [matrix_data, setMatrixData] = useState([]);
  const [csv_uploaded_data, setCsvJsonData] = useState([]);
  const [reportingAndInterpretation, setReportingAndInterpretation] = useState({})
  const [selectedRows, setSelectedRows] = useState([]);

  const changeSetSelectedRows = (rowDetails) => {
    setSelectedRows(rowDetails)
  }

  // hook methods
  useEffect(() => {
    const list = results[Object.keys(results)];
    setReportingAndInterpretation(list[0].reportingAndInterpretation)
  });
  useEffect(() => {
    const list = marker_results[Object.keys(marker_results)];
    const mergedData = mergeTables(list,csv_uploaded_data);
    setReportingAndInterpretation(list.reportingAndInterpretation)
    setMatrixData(mergedData);
    setMatrixCols(Object.keys(keyToNameMapping))
  }, [csv_uploaded_data]);


  //custom methods
  const generateSelectedData = () => {
    //send to an api
  }

  const downloadData = () => {
    console.log(selectedRows)
  }

  return (
    <div>
      <Navbar variant="light" expand="lg" className="mb-5">
        <Container>
          <Navbar.Text><h5>Ion Torrent - AgriSeq Reporting and Interpretation Plugin</h5></Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <div className="margins">
        <h3 className="margin-min">AgriSeq</h3>
        <h1 className="margin-min">Reporting and Interpretation</h1>
        <div className="pull-apart">
            <div className="info-container">
              <Info
                reportingAndInterpretation={reportingAndInterpretation}
              />
            </div>
          <FileReader setCsvJsonData={setCsvJsonData} className="csv-upload-container" />
        </div>
        <div className="pull-apart-max">
          <Button className="button button-margin" onClick={generateSelectedData} disabled={selectedRows.length === 0}>Generate Selected</Button>
          <a
            href={
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(selectedRows,null,'\t'))
            } 
            download="fileName_1.json"
            disabled={selectedRows.length === 0}
          >
            <Button className="button button-margin" onClick={downloadData} disabled={selectedRows.length === 0}>Download</Button>
          </a>
          <Button className="button button-margin" disabled={selectedRows.length === 0}>Email</Button>
        </div>
        <Table name="DNA Table" data={matrix_data} columns={matrix_cols} changeSetSelectedRows={changeSetSelectedRows} />
      </div>
    </div>
  );
}

export default App;
