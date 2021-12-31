import { Table, Button } from 'react-bootstrap';
import { useState } from 'react';
import { InfoModal } from './infoModal';
import './App.css';

function AttributesTable(props) {
  const {
    data,
    columns
  } = props;

  const [show, setShow] = useState(false);
  const [rowInfo, setCurrentRowInfo] = useState({});

  const handleClose = () => {
    setCurrentRowInfo({})
    setShow(false)
  }
  const handleShow = (rowInfo) => {
    setCurrentRowInfo(rowInfo)
    setShow(true);
  }

  const onClickGenerate = (e) => {
    e.stopPropagation()
    console.log('only generate and no modal')
  }

  const onClickDownload = (e) => {
    e.stopPropagation()
    console.log('only generate and no modal')
  }

  const onClickEmail = (e) => {
    e.stopPropagation()
    console.log('only generate and no modal')
  }

  const makeHeader = () => {
      return (
        <thead>
            <tr>
                <th>
                  <input type="checkbox" />
                </th>
                {columns.map((colName,index) => {
                    return (
                        <th style={{minWidth: "100px"}} key={index}>{colName}</th>
                    )
                })}
                <th style={{maxWidth: "2em", textAlign: 'center'}}>Actions</th>
            </tr>
        </thead>
      );
  }

  const makeBody = () => {
      return (
        <tbody>
            {data.map((row,index) => {
                return (
                    <tr key={index}>
                        <input type="checkbox"/>
                        {Object.values(row).map((val,index) => {
                            return (
                                <td key={index}>
                                    {val !== '' ? val.substr(0,10):new Array(10).join( ' ' )}
                                </td>
                            )
                        })}
                        <td className="rowAlign">
                            <a
                              href={
                                "data:text/json;charset=utf-8," +
                                encodeURIComponent(JSON.stringify(data,null,'\t'))
                              }
                              download="fileName_1.json"
                            >
                              <Button className="button" onClick={onClickGenerate}>Generate</Button>
                            </a>
                            <Button className="button"  onClick={onClickDownload}>Download</Button>
                            <Button className="button"  onClick={onClickDownload}>Email</Button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
      );
  }
  return (
    <Table variant="light" size="sm" className="paddings">
        <InfoModal rowInfo={rowInfo} show={show} onClickClose={handleClose}/>
        {makeHeader()}
        {makeBody()}
    </Table>
  );
}

export default AttributesTable;