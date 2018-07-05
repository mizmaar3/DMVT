import React from 'react';
import PropTypes from "prop-types";

const DataTableView = ({ title, rows, width }) => {
  const headColumn = rows[0].map((item, i) => {
    return (<th key={"th"+i}>{item}</th>)
  });

  const eachRow = rows.map((item, i) => {
    let td = item.map((itm, j) => {
      return i === 0 ? (<th key={"td"+j}>{itm}</th>) : (<td key={"td"+j}>{itm}</td>);
    })
    return (<tr key={"tr"+i}>{td}</tr>)
  });

  return (
    <div className="data-table-view">
      <h2>{title}</h2>
      <table width={width}>
        <tbody>{eachRow}</tbody>
      </table>
    </div>
  )
};

DataTableView.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.array,
  width: PropTypes.string
};

export default DataTableView;
