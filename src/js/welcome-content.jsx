import React from 'react';

const WelcomeContent = ({show}) => {
  const theContent = show ? (
    <ul>
      <li>Please select options from dropdown above.</li>
      <li>Selecting a campaign will show details about its all goals in table.</li>
      <li>Selecting of a goal will show you impression per day in barchart</li>
      <br />
      <li className={"feature-li"}>The app is build on React.js</li>
      <li className={"feature-li"}>Table-view is a custom made view</li>
      <li className={"feature-li"}>Barchart is made using react-google-charts</li>
    </ul> ) : null;

  return (
    <div className="welcome-content">
      {theContent}
    </div>
  )
}

export default WelcomeContent;
