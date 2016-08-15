let React = require('react');

let DataTableView = React.createClass({

  render() {
    let rows = this.props.rows;

    let headColumn = rows[0].map((item, i) => {
        return (<th key={"th"+i}>{item}</th>)
      });

    let eachRow = rows.map((item, i) => {
      let td = item.map((itm, j) => {
        return i===0 ? (<th key={"td"+j}>{itm}</th>) : (<td key={"td"+j}>{itm}</td>);
      })
      return (<tr key={"tr"+i}>{td}</tr>)
    });

    return (
      <div className="data-table-view">
        <h2>{this.props.title}</h2>
        <table width={this.props.width}>
          <tbody>{eachRow}</tbody>
        </table>
      </div>
    )
  }

});

module.exports = DataTableView;
