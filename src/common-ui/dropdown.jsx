import React, { Component }  from 'react';


class Dropdown extends Component {

  constructor () {
    super();
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  onChange (event) {
    var value = event.target.value;
    this._onChange(value, event, this);
  }

  onBlur (event) {
    var value = event.target.value;
    this._onBlur(value, event, this);
  }

  _onChange() {
    if (this.props.onChange) {
      this.props.onChange.apply(null, arguments);
    }
  }

  _onBlur () {
    if (this.props.onBlur) {
      this.props.onBlur.apply(null, arguments);
    }
  }

  render () {
    var options = this.props.items.map( (item, key) => {
        return (
          <option value={item} key={key}>
            {item}
          </option> )
      });

    return (
      <div className="dropdown-inline styled-select blue semi-square">
        <select defaultValue={this.props.label} onChange={this.onChange}>
          <option value={false}>{this.props.label}</option>
          {options}
        </select>
       </div>
    );
  }

}

export default Dropdown;
