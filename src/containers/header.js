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
    if (!props.menu.links.length) {
      props.getMenu()
    } 
  }
  render() {
    let props = this.props
    let links = props.menu.links

    if (links && links.length) {
      links.forEach(link => {
        link.active = false
        if (link.path === props.path) {
          link.active = true
        }
      })
    }
    props.profile.active = props.profile.path === props.path ? true : false

    return (
    	<nav className="navbar navbar-default navbar-static-top">
  		 	<div className="container">
  			    <Menu menu={ props.menu }/>
            <Profile profile={ props.profile }/>
  		 	</div>
  		</nav>
    )
  }
}

const mapStateToProps = state => (
  {
    menu: state.header.menu,
    profile: state.header.profile,
    path: state.header.path
  }
)

const mapDispatchToProps = dispatch => (
	{
    getMenu: bindActionCreators(getMenuData, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
