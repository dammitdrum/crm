import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import Menu from '../components/header/menu'
import Profile from '../components/header/profile'
import { getMenuData } from '../actions/headerActions'

class Header extends Component {
  constructor(props) {
    super(props)
    let links = props.menu.links
    if (!links.length) {
      props.getMenu()
    }
  }
  render() {
    return (
    	<nav className="navbar navbar-default navbar-static-top">
  		 	<div className="container">
  			    <Menu menu={ this.props.menu }/>
            <Profile profile={ this.props.profile }/>
  		 	</div>
  		</nav>
    )
  }
}

const mapStateToProps = state => (
  {
    menu: state.header.menu,
    profile: state.header.profile
  }
)

const mapDispatchToProps = dispatch => (
	{
    getMenu: bindActionCreators(getMenuData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
