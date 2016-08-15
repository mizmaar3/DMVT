let React = require('react');

let WelcomeContent = React.createClass({
  render() {
    let theContent = this.props.show ? (
      <ul>
        <li>Please select options from dropdown above.</li>
        <li>Selection a campaign will show details about its all goals in table.</li>
        <li>Selection of a goal will show you impression per day in histogram</li>
      </ul> ) : null;

    return (
      <div className="welcome-content">
        {theContent}
      </div>
    )
  }

});

module.exports = WelcomeContent;
