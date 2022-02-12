import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './App.css';

function AttributesTable(props) {
  const {
    data,
    columns,
    changeSetSelectedRows
  } = props;

  const [show, setShow] = useState(false);
  const [rowInfo, setCurrentRowInfo] = useState({});
  const [activeParent, setActiveParent] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let a = []
    for (var i = 0; i < data?.length; i++) { a.push(false) }
    setActive(a);
  },[])

  useEffect(() => {
    if (activeParent) {
      changeSetSelectedRows(data)
    } else {
      changeSetSelectedRows([])
    }
  }, [activeParent]);

  useEffect(() => {
    if (active) {
      let res = []
      Object.values(active).forEach((state,index) => {
        if (state) {
          res.push(data[index])
        }
      })
      changeSetSelectedRows(res)
    }
  }, [active]);

  const handleClose = () => {
    setCurrentRowInfo({})
    setShow(false)
  }

  const handleShow = (rowInfo) => {
    setCurrentRowInfo(rowInfo)
    setShow(true);
  }

  const handleChange = (index) => {
    const activeTemp = Object.assign({}, active)
    activeTemp[index] = !active[index]
    setActive(activeTemp)
    setActiveParent(false)
  }

  const handleChangeParent = () => {
    let a = []
    for (var i = 0; i < data?.length; i++) { a.push(!activeParent) }
    setActive(a);
    setActiveParent(!activeParent)
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
                  <input type="checkbox" onClick={handleChangeParent} checked={activeParent} />
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
                        <input type="checkbox" onClick={() => handleChange(index)} checked={(active && active[index]) || activeParent} />
                        {Object.values(row).map((val,index) => {
                            return (
                                <td key={index}>
                                    {val !== '' ? val.substr(0,10):new Array(10).join( ' ' )}
                                </td>
                            )
                        })}
                        <td className="rowAlign">
                              <Button className="button" onClick={onClickGenerate}>Generate</Button>
                            <a
                              href={
                                "data:text/json;charset=utf-8," +
                                encodeURIComponent(JSON.stringify(data,null,'\t'))
                              }
                              download="fileName_1.json"
                            >
                              <Button className="button"  onClick={onClickDownload}>Download</Button>
                            </a>
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
        {makeHeader()}
        {makeBody()}
    </Table>
  );
}

export default AttributesTable;