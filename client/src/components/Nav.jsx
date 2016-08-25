import React from 'react';

const Nav = () => {
  return (
    <div className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {/*------------------- HEADER -----------------------*/}
          <a href="../" className="navbar-brand"><img src="./images/logo.png" /> CloudCollab</a>
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse" id="navbar-main">
          <ul className="nav navbar-nav">
          {/*------------------- more nav elements here if necessary -----------------------*/}            
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/api/github">Login with Github</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav;