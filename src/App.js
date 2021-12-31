import './App.css';
import { Navbar,Container,Button } from 'react-bootstrap';
import Table from './Table';
import { useEffect, useState } from 'react';
import FileReader from './FileReader';
import marker_results from './marker-results.json';
import { keyToNameMapping, mergeTables } from './keyToName';

function App() {
  const [matrix_cols, setMatrixCols] = useState([]);
  const [matrix_data, setMatrixData] = useState([]);
  const [csv_uploaded_data, setCsvJsonData] = useState([]);
  useEffect(() => {
    const list = marker_results[Object.keys(marker_results)];
    const mergedData = mergeTables(list,csv_uploaded_data);
    setMatrixData(mergedData);
    setMatrixCols(Object.keys(keyToNameMapping))
  }, [csv_uploaded_data]);
  return (
    <div>
      <Navbar variant="light" expand="lg" className="mb-5">
        <Container>
          <Navbar.Text><h5>Ion Torrent - AgriSeq Reporting and Interpretation Plugin</h5></Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <div className="margins">
        <div className="pull-apart">
          <div className="info-container">

          </div>
          <FileReader setCsvJsonData={setCsvJsonData} className="csv-upload-container" />
        </div>
        <Table name="DNA Table" data={matrix_data} columns={matrix_cols} />
      </div>
    </div>
  );
}

export default App;
